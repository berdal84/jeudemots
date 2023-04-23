import React from 'react';
import './App.css';
import Joke from './components/Joke.js';

const BASE_URL      = "https://jeudemots.42borgata.com/api";
const BACKEND_PAGE  = `${BASE_URL}/page.php`;

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

  componentDidMount() {    
    setInterval( () => { this.fetchNextPage() }, this.state.refreshInterval )
    return this.fetchPage();
  }

  async fetchPage() {
    const params = new URLSearchParams({
      id:   this.state.currentPage.id,
      size: this.state.pages.size,
    });
    const response = await fetch(`${BACKEND_PAGE}?${params}`)
    const json     = await response.json();
    this.setState({ currentJoke: json.data.jokes[0] });
  }

  fetchNextPage() {
    if( this.state.currentPage.id + 1 >= this.state.page.count )
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
            <a href="https://jeudemots.42borgata.com">go to the original version</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
