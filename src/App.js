import logo from './logo.svg';

import './App.css';
import FirstEditor from './components/FirstEditor';
import SecondEditor from './components/SecondEditor';
import ThirdEditor from './components/ThirdEditor';
import FirstPage from './components/FirstPage';

function App() {
  return (
    <div className="App height_full">
      <header className="">
        <h1 className="text_center">Video Editor / converter</h1>
        {/* First Editor */}
        {/* <ImageEditor /> */}
        {/* Second Editor */}
        {/* Third Editor */}
      </header>
      <main className="height_full">
        {/* <SecondEditor /> */}
        {/* <FirstPage /> */}
        <ThirdEditor />
      </main>
    </div>
  );
}

export default App;
