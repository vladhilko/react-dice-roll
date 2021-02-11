import React, { useState } from 'react';
import Dice from './components/Dice';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Dice />
    </div>
  );
};

export default App;
