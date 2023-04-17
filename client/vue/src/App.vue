<template>
  <div className="App">
    <header>
      <img src="./assets/logo.png" className="logo" alt="logo" />
    </header>
    <Joke
      category="WIP"
      text="This is a joke"
      author="Berdal84"
      date="20-07-2022"
    />
    <footer>
      <p>This is the Vue version, go to the original 
        <a href="https://www.relativementutile.fr/jeudemots">Angular version</a>
      </p>
    </footer>
  </div>
  
</template>

<script>
import Joke from './components/Joke.vue'
import './theme.css'

export default {
  name: 'App',
  components: {
    Joke
  }
}
</script>


<style>
body {
  margin: 0;
  font-family: var(--font-family);
  font-size: var(--font-size);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

p {
  color: var(--text-light);
}

a {
  color: var(--text-light);
  transition: 0.5s;
}

a:hover {
  color: var(--text-light);
}

.App {
  text-align: center;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    background-color: var(--bg-light);
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.App .logo {
  pointer-events: none;
}

.App header {
  display: flex;
  flex-direction: column;
  flex: 0.2 0.2;
  align-items: center;
  justify-content: center;
  color: white;
}

.Joke {
  flex: 0.6 0;
  padding: 20px;
}

.App footer {
  position: fixed;
  align-items: center;
  bottom: 0px;
  width: 100vw;
  background-color: var(--bg-dark);
  opacity: 0.75
}

.App footer > p  {
  margin: 5px;
}

.spacer {
  flex: 30px;
}

</style>
