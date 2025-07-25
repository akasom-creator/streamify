// pages/index.tsx

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Track = {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);

  const searchSongs = async () => {
    if (!query) return;
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setTracks(data.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const bgClass = darkMode ? 'bg-[#121212] text-white' : 'bg-white text-black';
  const cardClass = darkMode ? 'bg-[#181818] hover:bg-[#282828]' : 'bg-gray-100 hover:bg-gray-200';

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} font-sans transition-all duration-300`}>
      
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-600">
        <h1 className="text-2xl font-bold">🎧 Streamify</h1>
        <nav className="space-x-4 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/playlists" className="hover:underline">Playlists</Link>
          <Link href="/albums" className="hover:underline">Albums</Link>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar (optional placeholder) */}
        <aside className={`w-64 p-6 hidden md:block ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
          <nav className="space-y-4 text-sm">
            <Link href="/" className="block hover:underline">Home</Link>
            <Link href="/browse" className="block hover:underline">Browse</Link>
            <Link href="/library" className="block hover:underline">Library</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 pb-36">
          {/* Search Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">Search Music</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Search songs or artists..."
                className="px-4 py-2 text-black rounded-l-md w-64 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={searchSongs}
                className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
              >
                Search
              </button>
            </div>
          </div>

          {/* Results */}
          {tracks.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4">Results</h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`${cardClass} rounded-xl p-4 shadow transition duration-300`}
                  >
                    <Image
                      src={track.album.cover_medium}
                      alt={track.title}
                      width={250}
                      height={250}
                      className="rounded-md mb-3 w-full"
                    />
                    <h4 className="text-lg font-semibold truncate">{track.title}</h4>
                    <p className="text-sm text-gray-400">{track.artist.name}</p>
                    <audio
                      controls
                      className="w-full mt-3"
                      onPlay={() => setNowPlaying(track)}
                    >
                      <source src={track.preview} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Fixed Bottom Player */}
      {nowPlaying && (
        <footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={nowPlaying.album.cover_medium}
                alt={nowPlaying.title}
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <h4 className="text-sm font-semibold">{nowPlaying.title}</h4>
                <p className="text-xs text-gray-400">{nowPlaying.artist.name}</p>
              </div>
            </div>
            <audio controls className="w-64">
              <source src={nowPlaying.preview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </footer>
      )}
    </div>
  );
}
