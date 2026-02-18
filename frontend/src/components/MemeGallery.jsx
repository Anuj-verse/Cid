import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const MemeGallery = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        fetchMemes();
    }, []);

    const fetchMemes = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/memes`);
            const data = await res.json();
            setMemes(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/memes/${id}/like`, { method: 'POST' });
            if (res.ok) {
                const updatedMeme = await res.json();
                setMemes(prev => prev.map(m => m._id === id ? updatedMeme : m));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {memes.map(meme => (
                <Card key={meme._id} className="overflow-hidden bg-card/50 border-input">
                    <div className="relative aspect-square bg-black">
                        {/* 
                           In a real app, we would store the generated image. 
                           Here we are engaging in some "CSS trickery" to reconstruct it 
                           because we stored components. Ideally, html2canvas output 
                           should be uploaded to S3 and that URL stored.
                           
                           Since we stored the *inputs*, we try to render them again.
                           BUT, for the gallery to look right, we really should have stored the image.
                             
                           Wait, my MemeEditor does this:
                           body: JSON.stringify({ character, imageUrl, topText, bottomText })
                           
                           So I have the components. I will render them as a "Live Meme" component.
                        */}
                        <img src={meme.imageUrl} alt="Meme Background" className="w-full h-full object-contain opacity-80" />

                        <div className="absolute top-4 left-0 right-0 text-center px-4">
                            <span className="text-2xl font-extrabold text-white stroke-black uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '1px black', fontFamily: 'Impact, sans-serif' }}>
                                {meme.topText}
                            </span>
                        </div>

                        <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                            <span className="text-2xl font-extrabold text-white stroke-black uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '1px black', fontFamily: 'Impact, sans-serif' }}>
                                {meme.bottomText}
                            </span>
                        </div>
                    </div>
                    <CardFooter className="flex justify-between items-center p-4 bg-secondary/10">
                        <span className="text-sm text-muted-foreground">By: Anonymous Agent</span>
                        <Button variant="ghost" size="sm" onClick={() => handleLike(meme._id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Heart className={`mr-2 h-4 w-4 ${meme.likes > 0 ? 'fill-current' : ''}`} />
                            {meme.likes}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            {memes.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    No memes yet. Be the first to create chaos!
                </div>
            )}
        </div>
    );
};

export default MemeGallery;
