import './App.css';
import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';

function App() {
 
  return (
    <div className="App">
    <h1> React + D3 </h1>
    <Barchart/>
    <Scatterplot></Scatterplot>
    </div>
  );
}

export default App;