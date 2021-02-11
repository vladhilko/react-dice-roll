import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import './Dice.css'; // Ensure CSS is correctly imported


const getRandomRotation = () => {
  // Use degrees that ensure the dice ends upright
  const fullRotations = [360, 720]; // Full rotations
  const additionalRotation = [0, 90, 180, 270]; // Additional rotation to ensure upright orientation
  return {
    x: fullRotations[Math.floor(Math.random() * fullRotations.length)] + additionalRotation[Math.floor(Math.random() * additionalRotation.length)],
    y: fullRotations[Math.floor(Math.random() * fullRotations.length)] + additionalRotation[Math.floor(Math.random() * additionalRotation.length)],
  };
};

const Dice = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // Start without triggering animation
  const [rollKey, setRollKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.code === 'Space') { // Check if space bar was pressed
        event.preventDefault(); // Prevent the default action to avoid scrolling or other side effects
        rollDice();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const rollDice = () => {
    setRotation(getRandomRotation()); // Update rotation for new roll

    setRollKey(prevKey => prevKey + 1); // Change key to re-trigger animation
  };

  const diceAnimation = {
    initial: { rotateX: 0, rotateY: 0 },
    animate: {
      rotateX: rotation.x,
      rotateY: rotation.y,
      transition: { duration: 5, ease: [0.22, 0.68, 0.32, 0.98] }, // Smoother start and end
    },
  };

  return (
    <div className="scene container">
      <motion.div
        key={rollKey}
        className="cube"
        initial="initial"
        animate="animate"
        variants={diceAnimation}
      >
        {/* Face One */}
        <div className="face front one">
          <div className="dot"></div>
        </div>

        {/* Face Two */}
        <div className="face back two">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Face Three */}
        <div className="face right three">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Face Four */}
        <div className="face left four">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        <div className="face left four">
          <div className="dot corner tl"></div> {/* Top left */}
          <div className="dot corner tr"></div> {/* Top right */}
          <div className="dot corner bl"></div> {/* Bottom left */}
          <div className="dot corner br"></div> {/* Bottom right */}
        </div>

        {/* Face Five */}
        <div className="face top five">
          <div className="dot middle"></div> {/* Middle dot */}
          <div className="dot corner tl"></div> {/* Top left */}
          <div className="dot corner tr"></div> {/* Top right */}
          <div className="dot corner bl"></div> {/* Bottom left */}
          <div className="dot corner br"></div> {/* Bottom right */}
        </div>

        {/* Face Six */}
        <div className="face bottom six">
          <div className="dot tl"></div>
          <div className="dot tr"></div>
          <div className="dot bl"></div>
          <div className="dot br"></div>
          <div className="dot ml"></div> {/* Middle left */}
          <div className="dot mr"></div> {/* Middle right */}
        </div>
      </motion.div>
      <div className="button-container my-8">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-16"
          onClick={rollDice}
        >
          Roll Dice
        </button>
      </div>
      <div className="note w-screen text-center my-8">
        Press the <strong>Space</strong> bar or click the button to roll the dice.
      </div>
    </div>
  );
};

export default Dice;
