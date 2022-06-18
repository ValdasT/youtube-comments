import React from 'react';
import classes from './spinner-small.module.scss';

const SpinnerSmall = ({ ...otherProps }) => {
  return <div className={classes['spinner-small']} {...otherProps}></div>;
};

export default SpinnerSmall;
