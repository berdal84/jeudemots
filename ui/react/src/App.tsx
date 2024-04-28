import { JokeCard } from './components/JokeCard'
import './App.css';
import { useFetchJoke } from './hooks';
import { config } from './App.config';
import { useEffect } from 'react';

function App() {
  const [currentJoke, next, error] = useFetchJoke(0);

  useEffect(() => {
    const t = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(t);
  }, [next])

  return (
    <div className="App">
      <header>
        <img src="logo.png" className="logo" alt="logo" />
      </header>
      {
        error ?? <JokeCard joke={currentJoke} />
      }
      <footer>
        <p >This is the React version,
          <a href={config.host.ng}>go to the original version</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
