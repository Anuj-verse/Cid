import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import MemeEditor from '@/components/MemeEditor';
import MemeGallery from '@/components/MemeGallery';

function App() {
  const [characters, setCharacters] = useState([])
  const [view, setView] = useState('generator'); // 'generator' | 'gallery'

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`/api/characters`)
      const data = await response.json()
      setCharacters(data)
    } catch (error) {
      console.error('Error fetching characters:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-primary tracking-tighter drop-shadow-lg">
          CID MEME VERSE
        </h1>
        <p className="text-muted-foreground text-lg">
          "Kuch toh gadbad hai..." - create your own chaos!
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant={view === 'generator' ? 'default' : 'outline'}
            onClick={() => setView('generator')}
            size="lg"
          >
            Meme Generator
          </Button>
          <Button
            variant={view === 'gallery' ? 'default' : 'outline'}
            onClick={() => setView('gallery')}
            size="lg"
          >
            Community Gallery
          </Button>
        </div>
      </header>

      {view === 'generator' ? (
        <MemeEditor characters={characters} />
      ) : (
        <MemeGallery />
      )}

      <footer className="mt-16 text-muted-foreground text-sm opacity-50">
        Made for sheer bakchodi by the CID Forensic Lab
      </footer>
    </div>
  )
}

export default App
