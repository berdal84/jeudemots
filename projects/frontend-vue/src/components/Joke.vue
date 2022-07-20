<template>
  <div className="Joke">
    <h1 className="category tab">{{category}}</h1>
    <div className="text">
      <h1 className>{{text}}</h1>
    </div>
    <h1 className="author tab">{{author}}</h1>
    <h1 className="date">{{date}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Joke-View',
  props: {
    category: String,
    text: String,
    author: String,
    date: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Joke {
    display: flex;
    justify-content: center;
    color: var(--text-light);
    text-shadow: var(--text-shadow);
    flex-direction: column;
}

.category {
    font-size: 2em;
    align-self: start;
    border-radius: 20px 20px 0 0;
    margin-left: 20px;
    margin-bottom: 0;
}

div.text {
    margin: 0;
    padding: var(--padding-lg);
    border-radius: 20px;
    background-color: var(--bg-dark);
    border: solid var(--bg-light) 5px;
    min-height: 7.5em;
    transition: height 1s ease-out;    
}

div.text > * {
    font-size: 2.5em;
    text-align: left;
    padding: 0;
    margin: 0;
}

.author {
    border-radius: 0 0 20px 20px;
    padding: var(--padding-lg);
    font-size: 1.2em;
    align-self: end;
    margin-right: 20px;
    margin-top: 0;
}

.tab {
    padding: var(--padding-sm) var(--padding-lg) var(--padding-sm) var(--padding-lg) ;
    background-color: var(--bg-dark);
}
</style>
