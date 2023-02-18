import React, { Component } from 'react';

import classes from './App.module.css';

import Header from '../../components/Header/Header';
import Responses from '../../components/Responses/Responses';
import SelectedResponses from '../../components/SelectedResponses/SelectedResponses';
import Question from '../../components/Question/Question';
import PlayButton from '../../components/PlayButton/PlayButton';
import Controls from '../../components/Controls/Controls';
import Feedback from '../../components/Feedback/Feedback';


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class App extends Component {

  //mostly copied from pitch_question_attempts_helper from Ruby project
  generatePitches(tonic, type, keyName) {
    let pitches = [];
    if (type === 'names') {
      switch (tonic + " " + keyName) {
        case "C Major":
          pitches = "C D E F G A B".split(" ");
          break;
        case "A Melodic Minor":
          pitches = "A B C D E F F# G G#".split(" ");
          break;
        case "F Major":
          pitches = "F G A Bb C D E".split(" ");
          break;
        case "D Melodic Minor":
          pitches = "D E F G A Bb B C C#".split(" ");
          break;
        case "Bb Major":
          pitches = "Bb C D Eb F G A".split(" ");
          break;
        case "G Melodic Minor":
          pitches = "G A Bb C D Eb E F F#".split(" ");
          break;
        case "Eb Major":
          pitches = "Eb F G Ab Bb C D".split(" ");
          break;
        case "C Melodic Minor":
          pitches = "C D Eb F G Ab A Bb B".split(" ");
          break;
        case "Ab Major":
          pitches = "Ab Bb C Db Eb F G".split(" ");
          break;
        case "F Melodic Minor":
          pitches = "F G Ab Bb C Db D Eb E".split(" ");
          break;
        case "Db Major":
          pitches = "Db Eb F Gb Ab Bb C".split(" ");
          break;
        case "Bb Melodic Minor":
          pitches = "Bb C Db Eb F Gb G Ab A".split(" ");
          break;
        case "Gb Major":
          pitches = "Gb Ab Bb Cb Db Eb F".split(" ");
          break;
        case "Eb Melodic Minor":
          pitches = "Eb F Gb Ab Bb Cb C Db D".split(" ");
          break;
        case "Cb Major":
          pitches = "Cb Db Eb Fb Gb Ab Bb".split(" ");
          break;
        case "Ab Melodic Minor":
          pitches = "Ab Bb Cb Db Eb Fb F Gb G".split(" ");
          break;
        case "G Major":
          pitches = "G A B C D E F#".split(" ");
          break;
        case "E Melodic Minor":
          pitches = "E F# G A B C C# D D#".split(" ");
          break;
        case "D Major":
          pitches = "D E F# G A B C#".split(" ");
          break;
        case "B Melodic Minor":
          pitches = "B C# D E F# G G# A A#".split(" ");
          break;
        case "A Major":
          pitches = "A B C# D E F# G#".split(" ");
          break;
        case "F# Melodic Minor":
          pitches = "F# G# A B C# D D# E E#".split(" ");
          break;
        case "E Major":
          pitches = "E F# G# A B C# D#".split(" ");
          break;
        case "C# Melodic Minor":
          pitches = "C# D# E F# G# A A# B B#".split(" ");
          break;
        case "B Major":
          pitches = "B C# D# E F# G# A#".split(" ");
          break;
        case "G# Melodic Minor":
          pitches = "G# A# B C# D# E E# F# G".split(" ");
          break;
        case "F# Major":
          pitches = "F# G# A# B C# D# E#".split(" ");
          break;
        case "D# Melodic Minor":
          pitches = "D# E# F# G# A# B B# C# D".split(" ");
          break;
        case "C# Major":
          pitches = "C# D# E# F# G# A# B#".split(" ");
          break;
        case "A# Melodic Minor":
          pitches = "A# B# C# D# E# F# G G# A".split(" ");
          break;
        default:
          pitches = null; // throw an error TODO
      }
    } else if (type === 'solfege_movable_do') {
      if (keyName === 'Major') {
        pitches = "do re mi fa so la ti".split(" ");
      } else if (keyName === "Melodic Minor") {
        pitches = "la ti do re mi fa fi so si".split(" ");
      } else {
        pitches = null; // throw an error TODO
      }
    } else {
      pitches = null; //throw an error TODO
    }
    return pitches;
  }

  generateQuestions(mode, type, level, tonic, keyName) {
    // alright, this is a toughie!
    let valid_questions = [];

    // for pitch - we can use solfege to easily notate all possible questions, randomly select one, and then convert it to right key
    //we could probably cache some of this work... do it later, though?
    // also: other options need to be added, of course.
    if (mode === "pitch") {
      if (keyName === "Major") {
        switch (level) {
          case 1:
          case 2:
          case 3:
            // valid "next note" can be one pitch away or part of the major arpeggio going
            // from one note to the next -- e.g., C-E-G-A, C-D-E-C, B-A-G-E
            let qstems = [[0], [2], [4], [7]];
            let num_notes = 4;
            for (let i = 1; i < num_notes; i++) {
              let newqstems = [];
              for (let x of qstems) {
                let z = x[x.length - 1];
                // valid choices: z-1, z+1; if z=0 (do), z=2 (mi);
                // if z=2 (mi), z=0 (do) and z=4 (so)
                // if z=4 (so), z=0 (do)
                if (z - 1 >= 0) {
                  newqstems.push(x.concat(z - 1));
                }

                if (z + 1 <= 7) {
                  newqstems.push(x.concat(z + 1));
                }

                if (z === 0) {
                  newqstems.push(x.concat(2));
                } else if (z === 2) {
                  newqstems.push(x.concat(0));
                  newqstems.push(x.concat(4));
                } else if (z === 4) {
                  newqstems.push(x.concat(2));
                }
              }
              qstems = newqstems;
            }
            valid_questions = qstems;
            console.log(valid_questions);
            break;
          default: valid_questions = null;
        }
      } else if (keyName === "Melodic Minor") {
        switch (level) {
          case 1:
            valid_questions = [[0, 0], [1, 1], [2, 2], [0, 1], [1, 0], [1, 2], [2, 1], [0, 2], [2, 0]];
            break;
          case 2:
            valid_questions = [[0, 0], [1, 1], [2, 2], [0, 1], [1, 0], [1, 2], [2, 1], [0, 2], [2, 0], [3, 3], [4, 4], [2, 3], [3, 2], [3, 4], [4, 3], [2, 4], [4, 2]];
            break;
          case 3:
            valid_questions = [[0, 0], [1, 1], [2, 2], [0, 1], [1, 0], [1, 2], [2, 1], [0, 2], [2, 0], [3, 3], [4, 4], [2, 3], [3, 2], [3, 4], [4, 3], [2, 4], [4, 2], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [4, 6], [5, 4], [6, 8], [7, 5], [8, 9], [9, 7], [4, 9], [9, 4]];
            break;
          default: valid_questions = null;
        }
      }
    }

    shuffleArray(valid_questions);

    return valid_questions;

  }

  findPitches(possible_pitches, question) {

    // lowest possible note = B3
    // highest possible note = B5

    let possible_pitches_octave = [];
    let octave = 4;
    if (possible_pitches[0].startsWith("B")) {
      octave = 3;
    }
    for (let p of possible_pitches) {
      possible_pitches_octave.push(p + octave);
      if (p.startsWith("B")) {
        octave++;
      }
    }
    possible_pitches_octave.push(possible_pitches[0] + octave);

    let result = [];

    for (let q of question) {
      result.push(possible_pitches_octave[parseInt(q)]);
    }

    return result;
  }

  checkAnswer = () => {
    this.setState(function (state) {
      // use state.selectedResponses
      // and state.questions[state.questionNumber-1]
      // with state.pitches (array of all possible pitches)
      let correct = true;
      let q = state.questions[state.questionNumber - 1];
      let p = state.pitches.concat(state.pitches[0]);
      let correctAnswer = [];
      for (let i in q) {
        correctAnswer.push(p[q[i]]);
      }
      for (let i in state.selectedResponses) {
        if (correctAnswer[i] !== state.selectedResponses[i]) {
          correct = false;
        }
      }
      if (correctAnswer.length !== state.selectedResponses.length) {
        correct = false;
      }


      return {
        correct: correct,
        isFinished: true,
        correctAnswer: correctAnswer
      };
    });
  }

  nextQuestion = () => {
    this.setState(function (state) {
      let qn = state.questionNumber + 1;
      if (qn > state.questions.length) {
        qn = 1; //starting over? fine for now
      }
      return {
        scorePitches: this.findPitches(state.pitches, state.questions[qn - 1]),
        questionNumber: qn,
        selectedResponses: [],
        correct: false,
        isFinished: false,
        correctAnswer: []
      }
    });
  }

  setSelectedResponse = (display) => {
    this.setState(function (state) {
      return {
        selectedResponses: state.selectedResponses.concat(display)
      };
    });
  }

  removeSelectedResponse = (index) => {
    this.setState(function (state) {
      let k = state.selectedResponses;
      k.splice(index, 1);
      return {
        selectedResponses: k
      };
    });
  }

  setInitialState(options) {
    let result = {};
    result.mode = options.mode;
    result.type = options.type;
    result.level = options.level;
    //conditional based on mode and type, in future TODO

    result.tonic = options.tonic;
    result.keyName = options.keyName;

    // based on key, generate pitches:
    result.pitches = this.generatePitches(options.tonic, options.type, options.keyName);
    if (options.level === 1) {
      result.pitches = result.pitches.slice(0, 3);
    } else if (options.level === 2) {
      result.pitches = result.pitches.slice(0, 5);
    }

    // generate questions in shuffled order
    result.questions = this.generateQuestions(options.mode, options.type, options.level, options.tonic, options.keyName);
    result.questionNumber = 1; //on question 1

    result.scorePitches = this.findPitches(result.pitches, result.questions[0]);

    result.selectedResponses = [];
    result.correct = false;
    result.isFinished = false;
    result.correctAnswer = [];

    return result;
  }

  constructor(props) {
    super(props);
    this.state = this.setInitialState({ mode: 'pitch', type: 'names', tonic: 'C', keyName: 'Major', level: 3 });
  }

  render() {
    //conditionally render question
    console.log("I'm running render");

    let question = <Question
      mode={this.state.mode}
      tonic={this.state.tonic}
      keyName={this.state.keyName}
      type={this.state.type}
      level={this.state.level}
      question={this.state.questions[this.state.questionNumber - 1]}
      scorePitches={this.state.scorePitches}
      questionNumber={this.state.questionNumber}
    />;

    //eslint-disable-next-line
    // render selectedResponses
    let selectedResponses = <SelectedResponses
      responses={this.state.selectedResponses}
      removeResponseHandler={this.removeSelectedResponse}
    />;
    //TODO

    //conditionally render responses w/ buttons:
    let responses = <Responses
      pitches={this.state.pitches}
      responseHandler={this.setSelectedResponse}
    />;

    let feedback = <Feedback
      correct={this.state.correct}
      finished={this.state.isFinished}
      correctAnswer={this.state.correctAnswer}
      providedAnswer={this.state.selectedResponses}
      dismissHandler={this.nextQuestion}
    />;

    // need to add displayedResponses and Controls

    return (
      <div className={classes.AppWrapper}>
        <Header />
        <div className={classes.BodyWrapper}>
          {question}
          {selectedResponses}

          <PlayButton
            steps={this.state.scorePitches.map(x => [x])}
          />
          {responses}
        <Controls
          checkHandler={this.checkAnswer} />
        {feedback}
        </div>
      </div>
    );
  }
}

export default App;
