import React, { useState } from 'react';
import Dice from './components/Dice';

const App = () => {
  const [diceNumber, setDiceNumber] = useState(1);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Dice number={diceNumber} rollDice={rollDice} />
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </div>
  );
};

export default App;
