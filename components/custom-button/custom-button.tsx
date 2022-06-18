import { FC, ReactNode } from 'react';
import classes from './custom-button.module.scss';

type Props = {
  children: ReactNode;
  type: 'submit' | undefined;
  onClick: () => void;
};

const CustomButton: FC<Props> = ({ children, ...otherProps }) => (
  <button className={classes['custom-button']} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
