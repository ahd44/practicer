import React from 'react'

import classes from './Feedback.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#app');

// not sure how to do this properly based on state changing TODO
const feedback = (props) => {

    const positiveFeedback = [
        "Nailed it!",
        "You got it!",
        "That's right!",
        "Way to go!",
        "Nice!",
        "Good job!",
        "Woohoo!",
        "Let's GOOOO!",
        "That's the stuff!"
    ];

    const negativeFeedback = [
        "Not quite...",
        "Maybe next time...",
        "Good try!",
        "Close, but...",
        "Aw, shucks!",
        "Noooooooo!",
        "Too bad!"
    ];

    // props should be:
    // correct: boolean
    // isFinished: boolean
    // correctAnswer: array
    // providedAnswer: array
    // dismissHandler

    let headerText = "";

    if(props.correct) {
        headerText = positiveFeedback[parseInt(Math.random()*positiveFeedback.length)];
    } else {
        headerText = negativeFeedback[parseInt(Math.random() * negativeFeedback.length)];
    }
    
    let details = <></>;

    if(!props.correct) {
        let yours = <> </>;
        for(let x of props.providedAnswer) {
            yours = <>
                {yours}
                <div>{x}</div>
            </>;
        }
        if(props.providedAnswer.length === 0) {
            yours = <>
            <div></div>
            </>;
        }
        yours = <div className={classes.AnswerRow}>
            <div className={classes.AnswerPrefix}>You said:</div>
            <div className={classes.ResponsesWrapper}>
                {yours}
            </div>
        </div>;
        let actual = <>  </>;
        for (let x of props.correctAnswer) {
            actual = <>
                {actual}
                <div>{x}</div>
            </>;
        }
        actual = <div className={classes.AnswerRow}>
            <div className={classes.AnswerPrefix}>Answer:</div>
            <div className={classes.ResponsesWrapper}>
                {actual}
            </div>
        </div>;
        details = <>
            <div>
                {yours}
                {actual}
            </div>
        </>;
    }

    const classnames = classes.FeedbackWrapper + " " + (props.correct?classes.Correct:classes.Incorrect);

    return (
        <Modal 
            className={classnames}
            isOpen={props.finished}
            onRequestClose={props.dismissHandler}
            contentLabel="Feedback"
            // eslint-disable-next-line react/style-prop-object
            style={{overlay: {zIndex: 3}}}
        >
            <h3>{headerText}</h3>

            {details}

            <button onClick={props.dismissHandler}>Next question</button>

        </Modal>
    );
}

export default feedback
