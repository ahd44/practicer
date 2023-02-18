import React from 'react'

import classes from './ResponseButton.module.css';

// expecting props:
// display: what ought to be displayed (e.g., "C" or "C#")
// clicked: the onClick function
const responseButton = (props) => {
    let buttonClasses = [
        classes.ResponseButtonWrapper
    ];

    return(
        <div className={buttonClasses.join(' ')}>
            <button
                type="button"
                name={"responseButton_"+props.display}
                onClick={() => props.responseHandler(props.display)}>{props.display}</button>
        </div>
    );
}

export default responseButton;
