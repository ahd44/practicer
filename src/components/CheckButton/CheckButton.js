import React from 'react'

import classes from './CheckButton.module.css';

const checkButton = (props) => {

    return(
      <div className={classes.CheckButtonWrapper}>
        <button
          type="button"
          name="checkButton"
          onClick={props.handler} >
          Check answer
        </button>
      </div>
    );
}

export default checkButton;
