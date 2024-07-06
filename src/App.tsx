import React from 'react';
import './App.css';
import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';
import Linechart from './components/Linechart';

function App() {
  return (
    <div className="App">
      <h1> React + D3 </h1>
      <Barchart />
      <Scatterplot  />
      <Linechart  />
      {/* <Worldmap  /> */}
    </div>
  );
}

export default App;
