import React from 'react';
import classes from './Header.module.css';

const header = (props) => {
  return(
    <header className={classes.Header}>
      <span className={classes.LargeText}>
        Practicer
      </span>
      <span className={classes.SmallText}>
        developed by Andrew Debevec, concept by <a className={classes.Link} href="https://samuelaraya.com" target="_blank" rel="noreferrer">Samuel Araya</a>
      </span>
      </header>
  );
}

export default header;
