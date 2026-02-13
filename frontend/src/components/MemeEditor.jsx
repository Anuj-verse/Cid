import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Download, Share2, RefreshCw, Type } from 'lucide-react';

const MemeEditor = ({ characters }) => {
    const [selectedChar, setSelectedChar] = useState(characters[0] || {});
    const [selectedPose, setSelectedPose] = useState(characters[0]?.poses?.[0] || '');
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiContext, setAiContext] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const memeRef = useRef(null);

    const handleCharChange = (charName) => {
        const char = characters.find(c => c.name === charName);
        setSelectedChar(char);
        setSelectedPose(char.poses[0]);
    };

    const handleDownload = async () => {
        if (memeRef.current) {
            const canvas = await html2canvas(memeRef.current);
            const link = document.createElement('a');
            link.download = `cid-meme-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleShare = async () => {
        setLoading(true);
        try {
            if (memeRef.current) {
                const canvas = await html2canvas(memeRef.current);
                const imageUrl = canvas.toDataURL();

                const response = await fetch('http://localhost:3000/memes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        character: selectedChar.name,
                        imageUrl: selectedPose, // Using the source image for now
                        topText,
                        bottomText
                    })
                });

                if (response.ok) {
                    alert('Meme shared to gallery!');
                } else {
                    console.error("Failed to share meme");
                }
            }
        } catch (error) {
            console.error('Error sharing meme:', error);
        }
        setLoading(false);
    };

    const handleAiGenerate = async () => {
        if (!aiContext) return;
        setAiLoading(true);
        try {
            const response = await fetch('http://localhost:3000/generate-caption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    character: selectedChar.name,
                    context: aiContext
                })
            });
            const data = await response.json();
            if (data.topText) setTopText(data.topText);
            if (data.bottomText) setBottomText(data.bottomText);
        } catch (error) {
            console.error("Error generating AI caption:", error);
            alert("Failed to generate AI caption. Check backend logs.");
        }
        setAiLoading(false);
    };

    const generateRandomQuote = () => {
        // Fetch random dialogue for selected character
        fetch(`http://localhost:3000/character/${selectedChar.name}/random`)
            .then(res => res.json())
            .then(data => {
                setBottomText(data.dialogue);
                setTopText(""); // Clear top text for random quotes
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
            {/* Configuration Panel */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Meme Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* AI Generator Section */}
                    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary mb-4">
                        <label className="block text-sm font-bold mb-1 text-primary">✨ AI Magic Generator</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={aiContext}
                                onChange={(e) => setAiContext(e.target.value)}
                                className="w-full p-2 rounded-md border bg-background text-foreground text-sm"
                                placeholder="Describe a situation (e.g. 'Boss caught me sleeping')"
                            />
                            <Button
                                variant="default"
                                size="icon"
                                onClick={handleAiGenerate}
                                disabled={aiLoading || !aiContext}
                                title="Generate with AI"
                            >
                                {aiLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Type className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Character</label>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {characters.map(char => (
                                <button
                                    key={char._id}
                                    onClick={() => handleCharChange(char.name)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 transaction-all ${selectedChar.name === char.name ? 'border-primary ring-2 ring-primary/50' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Pose</label>
                        <div className="grid grid-cols-3 gap-2">
                            {selectedChar.poses?.map((pose, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedPose(pose)}
                                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedPose === pose ? 'border-primary ring-2 ring-primary/50' : 'border-border'}`}
                                >
                                    <img src={pose} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <label className="text-sm font-medium">Top Text</label>
                            <input
                                type="text"
                                value={topText}
                                onChange={(e) => setTopText(e.target.value)}
                                className="w-full p-2 rounded-md border bg-background text-foreground"
                                placeholder="Enter top text..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Bottom Text</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                    className="w-full p-2 rounded-md border bg-background text-foreground"
                                    placeholder="Enter bottom text..."
                                />
                                <Button variant="outline" size="icon" onClick={generateRandomQuote} title="Random Quote">
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button className="flex-1" variant="secondary" onClick={handleShare} disabled={loading}>
                        <Share2 className="mr-2 h-4 w-4" /> {loading ? 'Sharing...' : 'Share to Gallery'}
                    </Button>
                </CardFooter>
            </Card>

            {/* Preview Panel */}
            <div className="flex-1 flex items-start justify-center">
                <div
                    ref={memeRef}
                    className="relative w-full max-w-[500px] aspect-square bg-black shadow-2xl rounded-lg overflow-hidden border-4 border-muted"
                >
                    <img src={selectedPose} alt="Meme Template" className="w-full h-full object-contain bg-black" crossOrigin="anonymous" />

                    <div className="absolute top-4 left-0 right-0 text-center px-4">
                        <span className="text-4xl font-extrabold text-white stroke-black uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '2px black', fontFamily: 'Impact, sans-serif' }}>
                            {topText}
                        </span>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                        <span className="text-4xl font-extrabold text-white stroke-black uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '2px black', fontFamily: 'Impact, sans-serif' }}>
                            {bottomText}
                        </span>
                    </div>

                    <div className="absolute top-2 right-2 opacity-50 text-[10px] text-white">
                        cid-meme-gen
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeEditor;
