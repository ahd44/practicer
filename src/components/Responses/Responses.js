import React from 'react'

import classes from './Responses.module.css';

import ResponseButton from '../ResponseButton/ResponseButton';
// expecting props:
// pitches: the pitches of the buttons
const responses = (props) => {

  let result = <></>;

  for(let p of props.pitches) {
    result =(
      <>
        {result}
        <ResponseButton
          display={p}
          responseHandler={props.responseHandler}
        />
      </>
    );
  }

  return(
    <div className={classes.ResponsesWrapper}>
      {result}
    </div>
  );
}

export default responses
