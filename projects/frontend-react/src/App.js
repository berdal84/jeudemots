import React from 'react';
import './App.css';
import Joke from './components/Joke.js';

class App extends React.Component {

  constructor(state) {
    super(state);

    this.state = {
      currentJoke: {
        category: "Category",
        text: "This is a joke text",
        author: "Author"
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src="logo.png" className="logo" alt="logo" />
        </header>
        <Joke {...this.state.currentJoke} />
        <footer>
          <p >This is the React version,
            <a href="https://www.relativementutile.fr/jeudemots">go to the original version</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
