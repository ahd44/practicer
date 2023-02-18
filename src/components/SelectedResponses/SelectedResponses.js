import React from 'react'

import classes from './SelectedResponses.module.css';

// not sure how to do this properly based on state changing TODO
const selectedResponses = (props) => {

  let result = <></>;

  for(let r in props.responses) {
    result = (
      <>
        {result}
        <div className="response"
          onClick={() => props.removeResponseHandler(r)}>{props.responses[r]}</div>
      </>
    );
  }

  return(
    <div className={classes.SelectedResponsesWrapper}>
      {result}
    </div>
  );
}

export default selectedResponses
