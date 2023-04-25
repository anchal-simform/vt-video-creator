import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App wrapper">
      <Routes>
        <Route path={'/editor'} element={<Editor />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
