// pages/index.tsx

import { useState } from 'react';

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

  const searchSongs = async () => {
    if (!query) return;

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setTracks(data.data);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      {/* Header */}
      <header className="p-6 bg-[#1DB954] flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold">🎧 Streamify</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search songs or artists..."
            className="px-4 py-2 text-black rounded-l-md w-64 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition"
            onClick={searchSongs}
          >
            Search
          </button>
        </div>
      </header>

      {/* Results */}
      <main className="p-6">
        {tracks.length > 0 && (
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        )}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-[#181818] rounded-xl p-4 shadow hover:bg-[#282828] transition duration-300"
            >
              <img
                src={track.album.cover_medium}
                alt={track.title}
                className="rounded-md mb-3 w-full"
              />
              <h3 className="text-lg font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400">{track.artist.name}</p>
              <audio controls className="w-full mt-3">
                <source src={track.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
