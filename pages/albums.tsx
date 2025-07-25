// pages/albums.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Album = {
  id: number;
  title: string;
  cover_medium: string;
  artist: { name: string };
};

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch('https://corsproxy.io/?https://api.deezer.com/chart/0/albums');
        const json = await res.json();
        setAlbums(json.data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🎵 Popular Albums</h1>

      {loading ? (
        <p className="text-gray-400">Loading albums...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {albums.map((album) => (
            <Link href={`/album/${album.id}`} key={album.id}>
              <div className="bg-[#181818] hover:bg-[#282828] transition rounded-lg p-4 cursor-pointer">
                <Image
                  src={album.cover_medium}
                  alt={album.title}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover mb-4 w-full"
                />
                <h2 className="text-lg font-semibold truncate">{album.title}</h2>
                <p className="text-sm text-gray-400">By {album.artist.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
