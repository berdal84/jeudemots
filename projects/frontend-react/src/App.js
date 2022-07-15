import './App.css';
import Joke from './components/Joke.js';

function App() {
  return (
    <div className="App">
      <header>
        <img src="logo.png" className="logo" alt="logo" />
      </header>
      <Joke
        category="Category"
        text="Un fils peut apporter le bénépère en retour"
        author="Berdal84">
      </Joke>
      <footer>
        <p >This is the React version, <a href="https://www.relativementutile.fr/jeudemots">go to the original version</a></p>
      </footer>
    </div>
  );
}

export default App;
