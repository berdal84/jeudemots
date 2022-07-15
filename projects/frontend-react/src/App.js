import React from 'react';
import './App.css';
import Joke from './components/Joke.js';

const BACKEND_BASE      = "https://www.relativementutile.fr/jeudemots-api";
const BACKEND_PAGE_READ = `${BACKEND_BASE}/page-read.php`;

class App extends React.Component {

  constructor(state) {
    super(state);

    this.state = {
      currentJoke: {
        category: "...",
        text: "...",
        author: "..."
      },
      page: {
        id: 0,
        size: 1
      },
      refreshInterval: 10000
    };

    // TODO: fetch pageS once to get page count.
  }

  async fetchPage() {
    const params = new URLSearchParams({
      id:   this.state.page.id,
      size: this.state.page.size,
    });
    const response = await fetch(`${BACKEND_PAGE_READ}?${params}`)
    const json     = await response.json();
    this.setState({ currentJoke: json.data.jokes[0] });
  }

  fetchNextPage() {
    this.page++;
    this.fetchPage();
  }

  componentDidMount() {
    this.fetchPage();
    setInterval( () => { this.fetchNextPage() }, this.state.refreshInterval )
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
