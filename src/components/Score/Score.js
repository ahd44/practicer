import React from 'react';
import classes from './Score.module.css';


/*
  expected props:

  width: number
  height: number

  notes: array of objects with pitch (string) and duration (string?) - pitch and/or duration could be an enum
  stems: boolean; default true
  beams: boolean; default true

  display_clef: boolean; default true

  clef: string (or enum) - treble, bass, alto, tenor; default treble
  time_signature: string (e.g., "4/4", "2/4", etc.)
  tonic: string
*/
const Score = (props) => {

  function drawClef() {
    if(props.clef === 'treble') {
      return <path stroke="#000000" transform="scale(.45) translate(10 40)" shapeRendering="auto" d="m51.688 5.25c-5.427-0.1409-11.774 12.818-11.563 24.375 0.049 3.52 1.16 10.659 2.781 19.625-10.223 10.581-22.094 21.44-22.094 35.688-0.163 13.057 7.817 29.692 26.75 29.532 2.906-0.02 5.521-0.38 7.844-1 1.731 9.49 2.882 16.98 2.875 20.44 0.061 13.64-17.86 14.99-18.719 7.15 3.777-0.13 6.782-3.13 6.782-6.84 0-3.79-3.138-6.88-7.032-6.88-2.141 0-4.049 0.94-5.343 2.41-0.03 0.03-0.065 0.06-0.094 0.09-0.292 0.31-0.538 0.68-0.781 1.1-0.798 1.35-1.316 3.29-1.344 6.06 0 11.42 28.875 18.77 28.875-3.75 0.045-3.03-1.258-10.72-3.156-20.41 20.603-7.45 15.427-38.04-3.531-38.184-1.47 0.015-2.887 0.186-4.25 0.532-1.08-5.197-2.122-10.241-3.032-14.876 7.199-7.071 13.485-16.224 13.344-33.093 0.022-12.114-4.014-21.828-8.312-21.969zm1.281 11.719c2.456-0.237 4.406 2.043 4.406 7.062 0.199 8.62-5.84 16.148-13.031 23.719-0.688-4.147-1.139-7.507-1.188-9.5 0.204-13.466 5.719-20.886 9.813-21.281zm-7.719 44.687c0.877 4.515 1.824 9.272 2.781 14.063-12.548 4.464-18.57 21.954-0.781 29.781-10.843-9.231-5.506-20.158 2.312-22.062 1.966 9.816 3.886 19.502 5.438 27.872-2.107 0.74-4.566 1.17-7.438 1.19-7.181 0-21.531-4.57-21.531-21.875 0-14.494 10.047-20.384 19.219-28.969zm6.094 21.469c0.313-0.019 0.652-0.011 0.968 0 13.063 0 17.99 20.745 4.688 27.375-1.655-8.32-3.662-17.86-5.656-27.375z" />;
    } else {
      // etc.
    }

    return <path />;
  }

  function drawStaff(xinit,xfinal) {
    return <path stroke="#A0A0A0" strokeLinecap="square" strokeWidth="1" shapeRendering="crispEdges" d={"M "+xinit+" 30 l "+(xfinal-xinit)+" 0 M "+xinit+" 40 l "+(xfinal-xinit)+" 0 M "+xinit+" 50 l "+(xfinal-xinit)+" 0 M "+xinit+" 60 l "+(xfinal-xinit)+" 0 M "+xinit+" 70 l "+(xfinal-xinit)+" 0 "} />;
  }

  function drawVerticalLine(x) {
    return <path stroke="#000000" strokeLinecap="square" strokeWidth="1" shapeRendering="crispEdges"  d={"M " + x + " 30 l 0 40"} />;
  }

  function drawLedgerLine(x, y) {
    return <path stroke="#808080" strokeLinecap="square" strokeWidth="1" shapeRendering="crispEdges" d={"M " + (x-9) + " " + y + " l 20 0"}/>
  }

  function drawSharpFrag() {
    return (
      <g transform="translate(-43 -28) scale(.6)">
        <path stroke="black" strokeWidth="4" d="M 28 20 v 60 m 10 -65 v 60" />
        <polygon stroke="black" fill="black" strokeWidth="1" points="20 40, 46 25, 46 32, 20 47, 20 40" />
        <polygon stroke="black" fill="black" strokeWidth="1" points="20 65, 46 50, 46 57, 20 72, 20 65" />
      </g>
    );
  }

  function drawFlatFrag() {
    return (
      <g transform="translate(-45 -41) scale(.6)">
        <path stroke="black" strokeWidth="4" d="M 28 20 v 60" />
        <path stroke="black" fill="black" d="M 26 84 c 30 -10 30 -45 0 -23 m 0 8 c 20 -23 20 0 0 11" />
      </g>
    );
  }

  function drawNaturalFrag() {
    return (
      <g transform="translate(-38 -34) scale(.5)">
        <path stroke="transparent" fill="black" d="M 20 20 l 0 80 l 24 -12 l 0 -10 l -20 10 l 0 -68" />
        <path transform="rotate(180 32 70)" stroke="transparent" fill="black" d="M 20 20 l 0 80 l 24 -12 l 0 -10 l -20 10 l 0 -68" />
      </g>
    );
  }

  function sharpOrderY(i) {
    switch (i) {
      case 0:
        return pitchToY("F4");
      case 1:
        return pitchToY("C4");
      case 2:
        return pitchToY("G4");
      case 3:
        return pitchToY("D4");
      case 4:
        return pitchToY("A3");
      case 5:
        return pitchToY("E4");
      case 6:
        return pitchToY("B3");
      default:
        return 0;
    }
  }

  function flatOrderY(i) {
    switch (i) {
      case 6:
        return pitchToY("F4");
      case 5:
        return pitchToY("C4");
      case 4:
        return pitchToY("G3");
      case 3:
        return pitchToY("D4");
      case 2:
        return pitchToY("A3");
      case 1:
        return pitchToY("E4");
      case 0:
        return pitchToY("B3");
      default:
        return 0;
    }
  }

  //determine the y-coordinate of a given pitch
  // pitch format is, e.g., "A#3" - A# 3rd octave, or "A3" - A 3rd octave
  function pitchToY(p) {
    switch (p) {
      case "F3":
      case "Fb3":
      case "F#3":
        return 100;
      case "G3":
      case "Gb3":
      case "G#3":
        return 95;
      case "A3":
      case "Ab3":
      case "A#3":
        return 90;
      case "B3":
      case "Bb3":
      case "B#3":
        return 85;
      case "C4":
      case "Cb4":
      case "C#4":
        return 80;
      case "D4":
      case "Db4":
      case "D#4":
        return 75;
      case "E4":
      case "Eb4":
      case "E#4":
        return 70;
      case "F4":
      case "Fb4":
      case "F#4":
        return 65;
      case "G4":
      case "Gb4":
      case "G#4":
        return 60;
      case "A4":
      case "Ab4":
      case "A#4":
        return 55;
      case "B4":
      case "Bb4":
      case "B#4":
        return 50;
      case "C5":
      case "Cb5":
      case "C#5":
        return 45;
      case "D5":
      case "Db5":
      case "D#5":
        return 40;
      case "E5":
      case "Eb5":
      case "E#5":
        return 35;
      case "F5":
      case "Fb5":
      case "F#5":
        return 30;
      case "G5":
      case "Gb5":
      case "G#5":
        return 25;
      case "A5":
      case "Ab5":
      case "A#5":
        return 20;
      case "B5":
      case "Bb5":
      case "B#5":
        return 15;
      case "C6":
      case "Cb6":
      case "C#6":
        return 10;
      default:
        return 60;
    }
  }

  function keyToRelativeMajor() {
    if(props.keyName === "Major") {
      return props.tonic;
    } else if (props.keyName.match(/.*Minor.*/)) {
      switch(props.tonic) {
        case "A": return "C";
        case "E": return "G";
        case "B": return "D";
        case "F#": return "A";
        case "C#": return "E";
        case "G#": return "B";
        case "D#": return "F#";
        case "A#": return "C#";
        case "D": return "F";
        case "G": return "Bb";
        case "C": return "Eb";
        case "F": return "Ab";
        case "Bb": return "Db";
        case "Eb": return "Gb";
        case "Ab": return "Ab";
        default: return "C";
      }
    }
  }

  var key_sig_space = 0;
  let current_states = [];
  current_states["C"] = "n";
  current_states["D"] = "n";
  current_states["E"] = "n";
  current_states["F"] = "n";
  current_states["G"] = "n";
  current_states["A"] = "n";
  current_states["B"] = "n";

  //use props.tonic to infer key signature
  function drawKeySignature() {
    let num_acc = 0;
    let sharp = false;
    // flats:
    switch (keyToRelativeMajor()) {
      case "C":
        return <></>;
      case "Cb":
        current_states["F"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "Gb":
        current_states["C"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "Db":
        current_states["G"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "Ab":
        current_states["D"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "Eb":
        current_states["A"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "Bb":
        current_states["E"] = "b";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "F":
        current_states["B"] = "b";
        num_acc++;
        sharp = false;
        break;
      case "C#":
        num_acc++;
        current_states["B"] = "#";
      // eslint-disable-next-line no-fallthrough
      case "F#":
        current_states["E"] = "#";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "B":
        current_states["A"] = "#";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "E":
        current_states["D"] = "#";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "A":
        current_states["G"] = "#";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "D":
        current_states["C"] = "#";
        num_acc++;
      // eslint-disable-next-line no-fallthrough
      case "G":
        current_states["F"] = "#";
        num_acc++;
        sharp = true;
        break;
      default:
        return null;
    }

    let key_sig_frags = <></>;

    for(let i=0;i<num_acc;i++) {
      if(sharp) {
        key_sig_frags = (
        <>
          {key_sig_frags}
          <g transform={"translate(" + (i*20) +"," + sharpOrderY(i)/.53 +")"}>
            {drawSharpFrag()}
          </g>
        </>
        );
      } else {
        key_sig_frags = (
        <>
            {key_sig_frags}
          <g transform={"translate(" + (i*20) + "," + flatOrderY(i)/.53 + ")"}>
            {drawFlatFrag()}
          </g>
        </>
        );
      }
    }

    key_sig_space = num_acc;

    // build a group of all accidentals placed at correct x/y
    return (
      <g transform={"translate(60, " + (sharp?"-35.5":"-35") + ")  scale(.53)"}>
        {key_sig_frags}
      </g>
    )
    
  }

  //eventually need to consider key signature in making this determination
  function toDrawAccidental(p) {
    let a = p.substring(1, 2);
    if(isFinite(parseInt(a))) {
      if(current_states[p.substring(0,1)] !== "n") {
        return true;
      }
    } else if(a !== current_states[p.substring(0,1)]) {
      return true; //accidental does not match current state
    }
    return false; //accidental does match current state
  }

  function drawQuarter(y) {
    if(props.stems && y <= 50) {
      return(
        <>
          <ellipse fill="#000" transform-origin="0 0" transform="rotate(-34)" cx="0" cy="0" rx="11.2" ry="7" />
          <path stroke="#000" d="m -9 4 l 0 49" strokeWidth="2"/>
        </>
      );
    } else if(props.stems) {
      return(
        <>
          <ellipse fill="#000" transform-origin="0 0" transform="rotate(-34)" cx="0" cy="0" rx="11.2" ry="7" />
          <path stroke="#000" d="m 9 -4 l 0 -49" strokeWidth="2"/>
        </>
      );
    } else {
      return(
        <ellipse fill="#000" transform-origin="0 0" transform="rotate(-34)" cx="0" cy="0" rx="11.2" ry="7" />
      );
    }
  }

  function drawEighth(y) {
    // this path took me FOREVER to figure out. Gee whiz!
    if(props.stems) {
      if(y <= 50) {
        return(
        <>
          {drawQuarter(y)}
          <path transform="rotate(180) scale(-.95 .8) translate(-18.5 -13.5)" d="M9.5 -54 C 10 -39, 35 -35, 18 -10 C 30 -37, 11 -34, 9.5 -42 Z" />
        </>
        );
      } else {
        return(
        <>
          {drawQuarter(y)}
          <path transform="scale(.95 .8) translate(.5 -13.5)" d="M9.5 -54 C 10 -39, 35 -35, 18 -10 C 30 -37, 11 -34, 9.5 -42 Z" />
        </>
      );
      }
    } else {
      return drawQuarter(y); // there is no difference between eighth and quarter w/o stem
    }
  }

  function drawSixteenth(y) {
    if(props.stems) {
      if(y <= 50) {
        return(
          <>
            {drawEighth(y)}
            <path transform="rotate(180) scale(-.87 .8) translate(-20 0)" d="M9.5 -54 C 10 -39, 35 -35, 18 -23 C 30 -37, 11 -34, 9.5 -42 Z" />
          </>
        );
      } else {
        return(
          <>
            {drawEighth(y)}
            <path transform="scale(.87 .8) translate(0.5 0)" d="M9.5 -54 C 10 -39, 35 -35, 18 -23 C 30 -37, 11 -34, 9.5 -42 Z" />
          </>
        );
      }
    } else {
      return drawQuarter(y);
    }
  }

  function drawHalf(y) {
    let stem = (<> </>);
    if(props.stems && y <= 50) {
      stem = <path stroke="#000" d="m -9.5 3 l 0 50" strokeWidth="2"/>;
    } else if (props.stems) {
      stem = <path stroke="#000" d="m 9.5 -3 l 0 -50" strokeWidth="2"/>;
    }
    return(
      <>
        {stem}
        <g transform="rotate(-34)">
          <path d="M -11 0 L -12 0 C -12 -9.5, 11 -9.5, 12 0 L 11 0 C 11 -5, -11 -5, -11 0" />
          <path d="M -11 0 L -12 0 C -12 9.5, 11 9.5, 12 0 L 11 0 C 11 5, -11 5, -11 0" />
        </g>
      </>
    );
  }

  function drawWhole(y) {
    return(
      <>
        <path d="M -11 0 L -12 0 C -12 -9.5, 11 -9.5, 12 0 L 11 0 C 11 -5, -11 -5, -11 0" />
        <path d="M -11 0 L -12 0 C -12 9.5, 11 9.5, 12 0 L 11 0 C 11 5, -11 5, -11 0" />
      </>
    );
  }

  // draws a note of duration d at x-position x+dx.x and y-position based on pitch
  // dx is an object that drawNote increments in order to keep track of where the next note should be drawn
  // pitch: string of length 2 ("A4" or "G5") or length 3 ("C#4" or "Eb5")
  // d: number, such that 1/number = portion of whole note
  // note: this gets irrational, so we need to ensure that rounding issues don't affect things
  /*     2/3 - dotted whole note
         1 - whole note
         4/3 - dotted half note
         2 - half note
         8/3 - dotted quarter note
         4 - quarter note
         16/3 - dotted eighth note
         8 - eighth note
         32/3 - dotted sixteenth note
         16 - sixteenth note
         32nd notes and beyond are not currently supported.
         other fractions should be converted into an appropriately tied entity --
         note: a rest is also a note, I guess, so... uh... yeah.
  */
  function drawNote(x, dx, pitch, d) {

    let y = pitchToY(pitch);

    let accidental = pitch.substring(1, 2);
    if (accidental !== "#" && accidental !== "b") {
      accidental = "n";
    }

    let acc_full = <> </>;

    if (toDrawAccidental(pitch)) {
      if (accidental === "#") {
        acc_full = drawSharpFrag();
      } else if (accidental === "b") {
        acc_full = drawFlatFrag();
      } else if (accidental === "n") {
        acc_full = drawNaturalFrag();
      }
      acc_full = <g transform={"translate(" + (x + dx.x + 10) + " " + y + ") scale(0.53)"}>
        {acc_full}
      </g>;
      dx.x += 12;
    } else {
    }

    

    let ledgers = (<></>);

    if(y >= 75) {
      //draw ledger lines at 80, 90, etc.
      let z = y;
      if(z%10 !== 0) {
        z += 5;
      }
      while( z > 75) {
        ledgers = (
          <>
            {ledgers}
            {drawLedgerLine(x+dx.x, z)}
          </>
        );
        z -= 10;
      }
    } else if(y <= 25) {
      //draw ledger lines at 80, 90, etc.
      let z = y;
      if(z%10 !== 0) {
        z -= 5;
      }
      while( z < 25) {
        ledgers = (
          <>
            {ledgers}
            {drawLedgerLine(x+dx.x, z)}
          </>
        );
        z += 10;
      }
    }



    let note = (<> </>);

    if(d === 4) {
      note = drawQuarter(y);
    } else if(d === 8) {
      note = drawEighth(y);
    } else if(d === 16) {
      note = drawSixteenth(y);
    } else if(d === 2) {
      note = drawHalf(y);
    } else if(d === 1) {
      note = drawWhole(y);
    }

    let drawn_notes = <>
      {acc_full}
      {ledgers}
      <g transform={"translate(" + (x + dx.x) + " " + y + ") scale(.53)"}>
        {note}
      </g>
    </>;

    dx.x += 27;

    return drawn_notes;
  }

  const ks = drawKeySignature();

  let x_pos = 60 + (key_sig_space)*19*.53;
  let x_inc_full = {x:0};
  let notes = (<> </>);

  for(let i of props.notes) {
    notes = (
      <>
        {notes}
        {drawNote(x_pos,x_inc_full,i.pitch,i.duration)}
      </>
    )
  }

  return(
    <div className={classes.ScoreWrapper}>
      <div className={classes.ScoreInterior}>
        <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100">
          {drawStaff(10,240)}

          {drawVerticalLine(240)}

          {drawClef()}

          {ks}

          {notes}

        </svg>
      </div>
    </div>
  );
}

export default Score;
