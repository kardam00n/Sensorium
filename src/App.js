import './App.css';
import MainComponent from './MainComponent'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </div>
  );
}

export default App;
