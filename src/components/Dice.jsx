import React, { useState } from 'react';
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
  const [initialRoll, setInitialRoll] = useState(true); // Prevent roll on initial render

  const rollDice = () => {
    if (!initialRoll) {
      // Only apply if not the first roll
      setRotation(getRandomRotation()); // Update rotation for new roll
    } else {
      // Enable rolling animation from now on
      setInitialRoll(false);
    }
    setRollKey(prevKey => prevKey + 1); // Change key to re-trigger animation
  };

  const diceAnimation = {
    initial: { rotateX: 0, rotateY: 0 },
    animate: initialRoll ? {} : { // Skip animation if initial roll
      rotateX: rotation.x,
      rotateY: rotation.y,
      transition: { duration: 5, ease: [0.22, 0.68, 0.32, 0.98] }, // Smoother start and end
    },
  };

  return (
    <div className="scene">
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
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
