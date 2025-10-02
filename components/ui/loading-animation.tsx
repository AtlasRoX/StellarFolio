'use client';
import { motion } from 'framer-motion';

const LoadingAnimation = ({
  titleFontClassName,
  subtitleFontClassName,
}: {
  titleFontClassName: string;
  subtitleFontClassName: string;
}) => {
  const titleText = 'Fah/.D';
  const subtitleText = 'Unify your dream';

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main Title Animation */}
      <motion.div
        style={{ perspective: '1000px' }}
        variants={container}
        initial="hidden"
        animate="visible"
        className={`flex justify-center items-center overflow-hidden ${titleFontClassName}`}
      >
        {titleText.split('').map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="text-5xl md:text-7xl font-medium text-black"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle Animation */}
      <motion.div
        style={{ perspective: '1000px' }}
        variants={container}
        initial="hidden"
        animate="visible"
        className={`flex justify-center items-center overflow-hidden ${subtitleFontClassName} mt-2`}
      >
        {subtitleText.split('').map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`text-lg md:text-xl font-light text-gray-600 ${letter === ' ' ? 'w-2' : ''}`}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;