import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import './App.scss';

function App() {
  return (
    <div className="App wrapper">
      <Routes>
        <Route
          path={'/editor'}
          element={
            <>
              <Header />
              <Editor />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
