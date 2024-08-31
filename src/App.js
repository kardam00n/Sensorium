import AboutProjectPage from './AboutProjectPage';
import AllPostsPage from './AllPostsPage';
import './App.css';
import MainComponent from './MainComponent'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/allPosts" element={<AllPostsPage />} />
        <Route path="/about" element={<AboutProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
