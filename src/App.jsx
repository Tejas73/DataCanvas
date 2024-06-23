import './App.css';
import Barchart from './components/Barchart';
import Linechart from './components/Linechart';
import Scatterplot from './components/Scatterplot';

function App() {

  return (
    <div className="App">
      <h1> React + D3 </h1>
      <Barchart />
      <Scatterplot></Scatterplot>
      <Linechart></Linechart>
    </div>
  );
}

export default App;