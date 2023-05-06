import React, { Component } from "react";
import Gamer from "./gamer";
import "./allGamers.css";
class AllGamers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idsOfGamers: 0,
      gamers: [],
      currentGamer: 0,
    };
    this.addGamer = this.addGamer.bind(this);
    this.playTheGame = this.playTheGame.bind(this);
  }

  addGamer = () => {
    let newName = prompt("Please enter the name of the new player😎");
    this.setState({
      gamers: [
        ...this.state.gamers,
        {
          id: this.state.idsOfGamers,
          name: newName,
          enabled: "No",
          goNext: true,
        },
      ],
    });
    this.setState({ idsOfGamers: this.state.idsOfGamers + 1 });
  };

  playTheGame = () => {
    this.changeEnabled();
  };
  //change the enabled of the current player to true and after the player did his turn it will turn this func will call again and the enable will become false
  changeEnabled = () => {
    let i = this.state.currentGamer;
    let gamers = [...this.state.gamers];

    const leftSideOfArray = gamers.slice(0, i);

    const rightSideOfArray = gamers.slice(i + 1, gamers.length);
    console.log(gamers[i].enabled);
    let yesOrNo = gamers[i].enabled == "No" ? "Yes" : "No";

    let gamer = { ...gamers[i], enabled: yesOrNo };
    console.log(leftSideOfArray, rightSideOfArray, gamer);
    gamers = [...leftSideOfArray, gamer, ...rightSideOfArray];
    console.log(gamers);
    this.setState(
      {
        gamers: gamers,
      },
      () => {
        console.log(this.state.gamers);
      }
    );

    if (yesOrNo == "No") {
      let next = i == this.state.gamers.length - 1 ? 0 : i + 1;

      this.setState({ currentGamer: next }, () => {
        this.changeEnabled();
      });
    }
  };
  //this func update the value of goNext of the gamer from true to false and false to true
  gamerStartNewGame = () => {
    let i = this.state.currentGamer;
    let gamers = [...this.state.gamers];

    const leftSideOfArray = gamers.slice(0, i);

    const rightSideOfArray = gamers.slice(i + 1, gamers.length);
    console.log(gamers[i].enabled);
    let trueOrFalse = gamers[i].goNext ? false : true;

    let gamer = { ...gamers[i], goNext: trueOrFalse };
    console.log(leftSideOfArray, rightSideOfArray, gamer);
    gamers = [...leftSideOfArray, gamer, ...rightSideOfArray];
    console.log(gamers);
    this.setState(
      {
        gamers: gamers,
      },
      () => {
        console.log(this.state.gamers);
      }
    );
  };

  deleteGamer = () => {
    let i = this.state.currentGamer;
    let gamers = [...this.state.gamers];

    const leftSideOfArray = gamers.slice(0, i);

    const rightSideOfArray = gamers.slice(i + 1, gamers.length);

    gamers = [...leftSideOfArray, ...rightSideOfArray];
    console.log(gamers);
    this.setState(
      {
        gamers: gamers,
      },
      () => {
        console.log(this.state.gamers);
        //there is gamers who still play in the game
        if (this.state.gamers.length) {
          let next = i > this.state.gamers.length - 1 ? 0 : i;

          this.setState({ currentGamer: next }, () => {
            this.changeEnabled();
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="background">
        <h1>Let's play🤩</h1>
        <button type="button" onClick={() => this.addGamer()}>
          Add Gamer
        </button>
        <button type="button" onClick={() => this.playTheGame()}>
          Start The Game
        </button>
        <ul>
          {this.state.gamers.map((gamer) => (
            <Gamer
              key={gamer.id}
              enabled={gamer.enabled}
              name={gamer.name}
              goNext={gamer.goNext}
              changeEnabled={this.changeEnabled}
              gamerStartNewGame={this.gamerStartNewGame}
              deleteGamer={this.deleteGamer}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default AllGamers;
