import React from 'react';
import Palette from './Palette'
import seedColors from './seedColors'

function App() {
  return (
    <div className="App">
      <Palette palette={...seedColors[4]}></Palette>
    </div>
  );
}

export default App;
