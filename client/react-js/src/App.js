import React from 'react';
import './App.css';
import Joke from './components/Joke.js';

const BASE_URL = "https://api.jeudemots.42borgata.com";
const BACKEND_PAGE_READ  = `${BASE_URL}/page-read.php`;
const BACKEND_PAGES_READ = `${BASE_URL}/pages-read.php`;

class App extends React.Component {

  constructor(state) {
    super(state);
    this.state = {
      currentJoke: {
        category: "...",
        text: "...",
        author: "..."
      },
      pages: {
        count: 0,
        size: 1
      },
      currentPage: {
        id: 0,
        size: 1
      },
      refreshInterval: 10000
    };
  }

  async componentDidMount() {    
    await this.fetchPages();
    setInterval( () => { this.fetchNextPage() }, this.state.refreshInterval )
    return this.fetchPage();
  }

  async fetchPages() {
    const params = new URLSearchParams({
      size: this.state.pages.size,
    });
    const response = await fetch(`${BACKEND_PAGES_READ}?${params}`)
    const json     = await response.json();
    this.setState({ pages: {...json.data} });
  }

  async fetchPage() {
    const params = new URLSearchParams({
      id:   this.state.currentPage.id,
      size: this.state.pages.size,
    });
    const response = await fetch(`${BACKEND_PAGE_READ}?${params}`)
    const json     = await response.json();
    this.setState({ currentJoke: json.data.jokes[0] });
  }

  fetchNextPage() {
    if( this.state.currentPage.id + 1 >= this.state.pages.count )
    {
      this.setState( {currentPage: {
        id: 0,
        size: this.state.currentPage.size
      }});
    }
    else
    {
      this.setState( { currentPage: {
        id: this.state.currentPage.id + 1,
        size: this.state.currentPage.size
      }});
    }    
    this.fetchPage();
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
