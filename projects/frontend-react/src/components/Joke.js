import React from 'react';
// import Joke from 'frontend-common';

import './Joke.css';

class JokeComponent extends React.Component {
    displayName = "Joke";
    
    render() {
        return <div className="Joke">
            <h1 className="category tab">{this.props.category}</h1>
            <div className="text">
                <h1 className="text">{this.props.text}</h1>
            </div>
            <h1 className="author tab">{this.props.author}</h1>
        </div>;
    }
}

export default JokeComponent;