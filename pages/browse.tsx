// pages/browse.tsx
import Link from 'next/link';

export default function Browse() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🔥 Browse Music</h1>
      <p className="text-gray-400 mb-6">Explore trending tracks, albums and playlists!</p>

      <div className="space-y-4">
        <Link href="/playlists" className="block bg-[#181818] hover:bg-[#282828] p-4 rounded-lg">
          🎧 Popular Playlists
        </Link>
        <Link href="/albums" className="block bg-[#181818] hover:bg-[#282828] p-4 rounded-lg">
          💿 Top Albums
        </Link>
        <Link href="/" className="block bg-[#181818] hover:bg-[#282828] p-4 rounded-lg">
          🔍 Search Songs
        </Link>
      </div>
    </div>
  );
}
