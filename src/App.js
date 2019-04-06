import React, { Component } from 'react';
import './App.css';
import characters from './naruto.json'

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
      <div className="App">
      <p>Current Score: {this.state.clicks}</p>
      <p>High Score: {this.state.highestClicks}</p>
       {this.state.characters.map(character => (
         <div key={character.id} className="card">
           <img src={`/assets/images/${character.src}`} alt={character.alt} onClick={()=>this.handleClick(character.id)}></img>
         </div>
       ))}
      </div>
    );
  }
}

export default App;
