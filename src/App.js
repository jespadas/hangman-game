import React, {Component} from 'react';
import './App.css';


import Word from './Word';
import Letter from './Letter';
import PenduSchema from "./Pendu";

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const WORDS = [
    "CACTUS",
    "MARIACHI",
    "TEQUILA",
    "ORDINATEUR",
    "OPENCLASSROOM",
    "JAVASCRIPT",
    "REACT",
    "INTERNET",
    "SOURIS",
    "FRANCE",
    "MEXIQUE",
    "VOYAGE",
    "VOITURE"
];

class App extends Component {

    state = {
        letters: LETTERS,
        selectedLetters: [],
        matchedIndex: [],
        matchedWord: App.generateWord(),
        guesses: 0,
        scores: 0,
    };

    static generateWord() {
        const word = WORDS[Math.floor(Math.random() * 10)];

        return word.split('');
    }

    handleLetterClick = index => {
        const {letters, selectedLetters, matchedWord, guesses, scores} = this.state;
        const letter = letters[index];
        let newScores = this.state.scores;

        if (matchedWord.indexOf(letter) !== -1) {
            if (selectedLetters.indexOf(letter) === -1) {
                this.updateMatchedLetters(letter);
                newScores = scores + 2;
                console.log(newScores);
                this.setState({scores: newScores});
            }
        } else {
            newScores = scores - 1;
            this.setState({scores: newScores});
            this.setState({guesses: guesses + 1});
        }

        if (selectedLetters.indexOf(letter) === -1) {
            this.setState({selectedLetters: [...selectedLetters, ...letter]});
        }
    };

    updateMatchedLetters = letter => {
        const {matchedWord, matchedIndex} = this.state;

        var indexOfLetter = matchedWord.indexOf(letter);
        var indexToAdd = [indexOfLetter];

        while (indexOfLetter !== -1) {
            indexOfLetter = matchedWord.indexOf(letter, indexOfLetter + 1);
            if (indexOfLetter !== -1) {
                indexToAdd.push(indexOfLetter);
            }
        }

        this.setState({matchedIndex: [...matchedIndex, ...indexToAdd]});
    };

    getFeedbackForLetter = index => {
        const {letters, selectedLetters} = this.state;
        const letter = letters[index];

        return selectedLetters.indexOf(letter) !== -1 ? 'used' : 'unused';
    };

    getFeedbackForWord = index => {
        const {matchedIndex} = this.state;

        for (var i = 0; i < matchedIndex.length; i++) {
            if (matchedIndex[i] === index) {
                return 'visible';
            }
        }
        return 'hidden';
    };

    startGame = () => {
        this.setState({
            letters: LETTERS,
            selectedLetters: [],
            matchedIndex: [],
            matchedWord: App.generateWord(),
            guesses: 0,
            scores: [0],
        });
        window.location.reload();
    };

    render() {
        const {letters, matchedWord, matchedIndex, guesses, scores} = this.state;
        const won = matchedWord.length === matchedIndex.length;
        const lose = guesses === 11;

        return (
            <div className="pendu-game">
                <p className="tries">Total tries : {guesses}</p>
                <div className="word">
                    {matchedWord.map((letter, index) => (
                        <Word
                            letter={letter}
                            index={index}
                            key={index}
                            feedback={this.getFeedbackForWord(index)}
                        />
                    ))}
                </div>
                <div className="letters">
                    {won ?
                        <div className="start">
                            <p className="pendu-game">You won! Your score :</p>
                            <p>{scores}</p>
                            <button onClick={this.startGame}>Start a new game</button>
                        </div>
                        : lose ?
                            <div className="start">
                                <p>You lose! Your score :</p>
                                <p>{scores}</p>
                                <button onClick={this.startGame}>Start a new game</button>
                            </div>
                            :
                            <div>
                                <p>Choose a letter !</p>
                                {letters.map((letter, index) => (
                                    <Letter
                                        letter={letter}
                                        feedback={this.getFeedbackForLetter(index)}
                                        index={index}
                                        key={index}
                                        onClick={this.handleLetterClick}
                                    />
                                ))}
                            </div>
                        }
                </div>
                    <div><PenduSchema guesses={guesses}/></div>
                    <div className="rules">
                        <h2>Game rules:</h2>
                        <table>
                            <tbody>
                            <tr>
                                <td>Guessed</td>
                                <td>+2 points</td>
                            </tr>
                            <tr>
                                <td>Missed</td>
                                <td>-1 point</td>
                            </tr>
                            </tbody>
                        </table>
                        <img className="logo-personal" src="logopersonalredondo.png" alt="logo julio"/>
                    </div>

            </div>
        );
    }
}

export default App;

