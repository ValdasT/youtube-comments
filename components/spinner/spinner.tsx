import React, { Fragment } from 'react';
import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <Fragment>
      <div>
        <div className={classes['spinner-bg']}></div>
        <div className={classes['spinner']}>
          <div className={classes['container']}>
            <div className={classes['spinner-container']}>
              <div className={classes['spinner-path']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};

export default Spinner;
