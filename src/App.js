import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import Artyom from 'artyom.js';

const styles = {
  container: {
    backgroundColor: '#282c34',
    height: window.innerHeight,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    marginTop: '20%',
    textAlign: 'center'
  },
  button: {
    maxWidth: 200,
    minWidth: 50,
    alignSelf: 'center',
    marginTop: 40
  },
  subheading: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  listening: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 20
  },
  footer: {
    position: 'absolute',
    color: 'gray',
    top: '97%',
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  anchor: {
    color: 'gray',
    // textDecoration: 'none'
  }
}

const artyom = new Artyom();

const commandList = {
  indexes:[
    "big",
    "thick",
    "small",
    "long",
    "large",
    "gigantic",
    "hard",
    "slowly",
    "fast",
    "blow",
    "put it in",
    "in mouth",
    "get back to work",
    "I can't take this anymore",
    "come in",
    "ride",
    "facial",
    "fill me",
    "fit it",
    "like bananas",
    "Put it in",
    "It hurts a little but not too bad",

  ], // These spoken words will trigger the execution of the command
  action: () => { // Action to be executed when a index match with spoken word
      artyom.say("That's what she said!");
  }
};

artyom.addCommands(commandList);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize' , this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({
      height: window.innerHeight
    });
  }

  handleStartPlaying = () => {
    this.setState({
      isPlaying: true
    });
    this.startContinuousArtyom();
  }

  handleStopPlaying = () => {
    artyom.fatality();
    this.setState({
      isPlaying: false
    });
  }
  
  startContinuousArtyom = () => {
    artyom.fatality();// use this to stop any of
    setTimeout(() => {// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:"en-GB",// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
            speed:1 // talk normally
        }).then(() => {
            console.log("Ready to work !");
        });
    },250);
}
  render() {
    const { isPlaying, height } = this.state;
    return (
      <div
        style={{
          backgroundColor: '#282c34',
          height,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          style={styles.title}
          variant="display3"
        >
          That's what she said.
        </Typography>
        <Typography style={styles.subheading} variant="subheading">
          Say your what comes to your mind...
        </Typography>
        <Button
          variant="raised"
          style={styles.button}
          onClick={isPlaying ? this.handleStopPlaying : this.handleStartPlaying}
        >
          {isPlaying ? 'Stop Playing' : 'Start Playing'}
        </Button>
        {isPlaying && <Typography style={styles.listening}>Listening...</Typography>}
        <Typography style={styles.footer}>
          made by Adrian Casanova 2019 <a style={styles.anchor} href="https://github.com/adrian-casanova">https://github.com/adrian-casanova</a>
        </Typography>
      </div>
    );
  }
}

export default App;
