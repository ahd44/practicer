import { Song, Track, Instrument } from 'reactronica';
import React from 'react';
import classes from './PlayButton.module.css';

const PlayButton = (props) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    function stopPlayback(step, index) {
        if(index === props.steps.length) {
            setIsPlaying(false);
        }
    }

    return (
        <>
            <button id="playButton" className={classes.PlayButton} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Stop' : 'Play'}
            </button>

            {/* Reactronica Components */}
            <Song isPlaying={isPlaying} bpm={60}>
                <Track
                    steps={props.steps.concat([null])}
                    subdivision={'4n'}
                    onStepPlay={(step, index) => {
                        stopPlayback(step, index);
                    }}
                >
                    <Instrument type="polySynth" />
                </Track>
            </Song>
        </>
    );
}


export default PlayButton;