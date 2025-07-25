import Image from "next/image";
import { motion } from "framer-motion";

interface MusicCardProps {
  title: string;
  artist: string;
  albumCover: string;
  previewUrl: string;
  onPlay: () => void;
}

export default function MusicCard({
  title,
  artist,
  albumCover,
  previewUrl,
  onPlay,
}: MusicCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full sm:w-72 p-4"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={albumCover}
        alt={title}
        width={300}
        height={300}
        className="rounded"
      />
      <div className="mt-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-500 dark:text-gray-300">{artist}</p>
        <audio controls className="w-full mt-2" onPlay={onPlay}>
          <source src={previewUrl} type="audio/mpeg" />
        </audio>
      </div>
    </motion.div>
  );
}
