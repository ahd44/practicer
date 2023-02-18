import React from 'react';
import classes from './Question.module.css';
import Score from '../Score/Score';

/*
  expected props:
  mode: string - pitch or rhythm
  tonic: string
  key: string - Major, Melodic minor, Relative minor, etc.
  presumably need width and height, too? or maybe that's not even necessary? IDK...
*/
const question = (props) => {

  function constructScore(props) {
    if(props.mode === "pitch") {
      let notes = [];
      for(let p of props.scorePitches) {
        notes.push({pitch:p,duration:4});
      }
      return(
        <Score
          notes={notes}
          stems={false}
          beams={false}
          displayClef={true}
          clef="treble"
          time_signature="none"
          tonic={props.tonic}
          keyName={props.keyName}
          width="80%"
        />
      );
    } else {
      return <></>;
    }
  }

  return(
    <div className={classes.QuestionWrapper}>
      <h2>Question #{props.questionNumber} - {props.tonic} {props.keyName}, Level {props.level}</h2>
      {constructScore(props)}
    </div>
  );
}

export default question;
