import React from 'react'

import classes from './Controls.module.css';
import CheckButton from '../CheckButton/CheckButton';

const controls = (props) => {

    return(
      <div className={classes.ControlsWrapper}>
        <CheckButton
          handler={props.checkHandler}/>
      </div>
    );
}

export default controls;
