import './App.css';
import Barchart from './components/Barchart';
import Linechart from './components/Linechart';
import Scatterplot from './components/Scatterplot';
import Worldmap from './components/Worldmap';

function App() {

  return (
    <div className="App">
      <h1> React + D3 </h1>
      <Barchart />
      <Scatterplot></Scatterplot>
      <Linechart></Linechart>
      <Worldmap></Worldmap>
    </div>
  );
}

export default App;