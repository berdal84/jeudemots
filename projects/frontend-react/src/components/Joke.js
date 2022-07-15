import React from 'react';
import './Joke.css';

class Joke extends React.Component {
    render() {
        return <div className="Joke">
            <h1 className="category tab">{this.props.category}</h1>
            <h1 className="text">{this.props.text}</h1>
            <h1 className="author tab">{this.props.author}</h1>
        </div>;
    }
}

export default Joke;