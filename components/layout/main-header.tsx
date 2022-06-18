import Link from 'next/link';
import { useContext } from 'react';
import { VideoContext } from '../../context/video-context';
import AlertMessage from '../alert/alert';

import classes from './main-header.module.scss';

const MainNavigation = () => {
  const { alert } = useContext(VideoContext);

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>Main page</a>
      </Link>
      <AlertMessage alert={alert} />
    </header>
  );
};

export default MainNavigation;
