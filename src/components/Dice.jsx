// Dice.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Dice.css'; // Make sure to import your CSS file

// This function will return a random rotation value for each axis.
const getRandomRotation = () => {
  const deg = [360, 720, 1080, 1440, 1800]; // Multiple rotations
  return {
    x: deg[Math.floor(Math.random() * deg.length)],
    y: deg[Math.floor(Math.random() * deg.length)],
    z: deg[Math.floor(Math.random() * deg.length)],
  };
};

const Dice = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const rollDice = () => {
    if (isRolling) return; // Ignore clicks if already rolling
    setIsRolling(true);
    const newRotation = getRandomRotation();
    setRotation(newRotation);

    // Reset rolling state after the animation ends
    setTimeout(() => {
      setIsRolling(false);
    }, 4000); // Adjust timeout to match the animation duration
  };

  const diceAnimation = {
    initial: { rotateX: 0, rotateY: 0, rotateZ: 0 },
    animate: {
      rotateX: rotation.x,
      rotateY: rotation.y,
      rotateZ: rotation.z,
      transition: { duration: 4, ease: "linear" }, // Increase duration for a slower animation
    },
  };

  return (
    <div className="scene" onClick={rollDice}>
      <motion.div className="cube" variants={diceAnimation} initial="initial" animate="animate">
        {/* Render each face of the cube */}
        <div className="face front">1</div>
        <div className="face back">6</div>
        <div className="face right">5</div>
        <div className="face left">2</div>
        <div className="face top">3</div>
        <div className="face bottom">4</div>
      </motion.div>
    </div>
  );
};

export default Dice;
