import { useEffect, useState } from 'react';
import Image from 'next/image';

type Track = {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
};

export default function Library() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('library');
    if (saved) {
      setTracks(JSON.parse(saved));
    }
  }, []);

  const removeTrack = (id: number) => {
    const updated = tracks.filter(track => track.id !== id);
    setTracks(updated);
    localStorage.setItem('library', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-36">
      <h1 className="text-3xl font-bold mb-6">🎵 Your Library</h1>

      {tracks.length === 0 ? (
        <p className="text-gray-400">No tracks saved yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tracks.map(track => (
            <div key={track.id} className="bg-[#181818] p-4 rounded-xl shadow">
              <Image
                src={track.album.cover_medium}
                alt={track.title}
                width={250}
                height={250}
                className="rounded mb-3"
              />
              <h4 className="text-lg font-semibold truncate">{track.title}</h4>
              <p className="text-sm text-gray-400">{track.artist.name}</p>
              <audio controls className="w-full mt-2">
                <source src={track.preview} type="audio/mpeg" />
              </audio>
              <button
                onClick={() => removeTrack(track.id)}
                className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
