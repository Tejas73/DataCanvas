import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';
import Linechart from './components/Linechart';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/barchart" element={<Barchart />} />
            <Route path="/scatterplot" element={<Scatterplot />} />
            <Route path="/linechart" element={<Linechart />} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* <Worldmap  /> */}
    </div>
  );
}

export default App;
