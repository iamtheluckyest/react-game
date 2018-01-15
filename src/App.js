import React, { Component } from 'react';
import Card from './components/Card';

class Character {
  
  makeId = () => {
    Character.counter += 1;
    this.id = Character.counter;
  }
  
  constructor(name, index) {
    this.makeId();
    this.name = name;
    this.img = `/images/${name.toLowerCase()}.png`;
    this.clicked = false;
  }
}

Character.counter = 0;

class App extends Component {
  
  state = {
    characters : [],
    gameOver : false,
    won: null
  }
  
  componentDidMount() {
    this.startGame();
  }
  
  componentWillUpdate() {
    console.log("update")
    console.log(this.state.characters)
  }
  
  startGame = () => {
    const characters = ["Aang", "Appa", "Azula", "Katara", "Momo", "Sokka", "Toph", "Zuko"];
    let temp = characters.map((char, index) => new Character(char));
    this.setState({characters : temp, gameOver: false}, this.shuffleItems());
  }
  
  shuffleItems = () => {
    let array = [...this.state.characters];
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    this.setState({characters: array});
  }
  
  pickImg = (index) => {
    let temp = [...this.state.characters];
    // If it hasn't been clicked yet...
    if (!temp[index].clicked){
      temp[index].clicked = true;
      const gameOver = temp.reduce((acc,char) => ((!char.clicked || !acc) ? false : true), true)
      if(gameOver) {
        this.setState({gameOver: true, won: true})
      } else {
        this.setState({characters: temp}, this.shuffleItems)
      }
    } 
    // if it has been clicked already
    else {
       this.setState({gameOver: true, won:false})
    }
  }
  
  render() {
    return ([
      <header className="green darken-2 white-text valign-wrapper">
        <h1>Clicky Game</h1>
      </header>,
      <div className="container">
        <div className="row">
          {this.state.gameOver 
          ? 
            [
              <p>You {this.state.won ? "Win!" : "Lost!"} </p>,
              <button onClick={this.startGame}>Play again?</button>
            ]
          :
            this.state.characters.map((item, index) => (
              <Card
                key={item.id} 
                index={index} 
                img={item.img} 
                name={item.name} 
                pickImg={this.pickImg} 
                clicked={item.clicked}
              />
            ))
          }
        </div>
      </div>
    ]);
  }
}

export default App;