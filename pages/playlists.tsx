import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Playlist = {
  id: number;
  title: string;
  picture_medium: string;
  creator: { name: string };
};

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch('/api/playlists'); // ✅ safer
        const json = await res.json();
        setPlaylists(json.data);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🎶 Popular Playlists</h1>

      {loading ? (
        <p className="text-gray-400">Loading playlists...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {playlists.map((playlist) => (
           <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
  <div className="bg-[#181818] hover:bg-[#282828] transition rounded-lg p-4 cursor-pointer">
    <Image
      src={playlist.picture_medium}
      alt={playlist.title}
      width={300}
      height={300}
      className="rounded-lg object-cover mb-4 w-full"
    />
    <h2 className="text-lg font-semibold truncate">{playlist.title}</h2>
    <p className="text-sm text-gray-400">
      {playlist.creator?.name ? `By ${playlist.creator.name}` : 'By Unknown'}
    </p>
  </div>
</Link>

          ))}
        </div>
      )}
    </div>
  );
}
