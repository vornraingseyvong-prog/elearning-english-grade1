import { motion } from 'framer-motion';
import { AVATARS } from '../context/AuthContext';

export default function AvatarPicker({ selected, onSelect, size = 'lg' }) {
  const gridCols = size === 'lg' ? 'grid-cols-4' : 'grid-cols-8';

  return (
    <div className={`grid ${gridCols} gap-2`}>
      {AVATARS.map((avatar) => (
        <motion.button
          key={avatar}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(avatar)}
          className={`
            text-3xl p-2 rounded-2xl transition-all border-4
            ${selected === avatar
              ? 'border-purple-500 bg-purple-100 shadow-lg scale-110'
              : 'border-transparent hover:bg-gray-100'
            }
          `}
        >
          {avatar}
        </motion.button>
      ))}
    </div>
  );
}