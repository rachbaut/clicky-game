import React, { Component } from 'react';
import './App.css';
import characters from './naruto.json'
import { CardColumns, Card, Container, Jumbotron } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: characters, 
      clicks: 0,
      highestClicks: 0
    }
  }

  componentDidMount() {
    this.shuffle()
  }

  shuffle = () => {
    let newChar = this.state.characters.sort(() => {
       return 0.5 - Math.random()
    })
    this.setState({
      characters: newChar
    })
  }

  handleClick = (id) => {
    // console.log(id);
    this.state.characters.map(character => {
      if(character.id === id && character.selected !== true) {
        let newClicks = this.state.clicks +1;
        character.selected = true;
        this.setState(prevState => {
         return {clicks: prevState.clicks +1}
        }) 
        if(newClicks > this.state.highestClicks) {
          this.setState({
            highestClicks: newClicks
          })
        }
        this.shuffle();
      } else if(character.id === id && character.selected === true) {
        characters.map(character => (
         character.selected = false
         ))
        this.setState({
          clicks: 0
        })
        this.shuffle();
      }
    })
  }

  render() {
    return (
   <div className="background">
        <Jumbotron className="header">
              <h1 className="subheader">Naruto Memory Game</h1>
              <p className="par">
                Start by clicking on any Naruto character. Now, if you click twice on any character that you have already picked then you lose. 
                This game will mark your highest score, now try picking all of the characters without losing!
              </p>
        </Jumbotron>
       <div className="App">
       <p className="current">Current Score: {this.state.clicks}</p>
       <p className="high">High Score: {this.state.highestClicks}</p>
        {this.state.characters.map(character => (
          <div key={character.id} className="card">
            <img src={`/assets/images/${character.src}`} alt={character.alt} onClick={()=>this.handleClick(character.id)}></img>
          </div>
        ))}
       </div>
    </div>
    );
  }
}

export default App;
