import { useState } from 'react';
import Home from './Home';
import Game from './Game';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    !isPlaying ? <Home setIsPlaying={setIsPlaying} /> : <Game />
  );
}

export default App;