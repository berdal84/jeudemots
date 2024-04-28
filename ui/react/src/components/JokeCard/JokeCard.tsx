import { Joke } from 'jeudemots-shared';
import './JokeCard.css';

const JokeCard = ({joke}: { joke: Joke}) => {
    return (
    <div className="JokeCard">
        <p className="category tab">{joke.category}</p>
        <div className="text">
            <p className="text">{joke.text}</p>            
        </div>
        <p className="author tab">{joke.author}</p>        
    </div>);
}

export { JokeCard }
