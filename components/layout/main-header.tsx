import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { VideoContext } from '../../context/video-context';
import AlertMessage from '../alert/alert';

import classes from './main-header.module.scss';

const MainNavigation = () => {
  const router = useRouter();
  const { alert } = useContext(VideoContext);
  return (
    <header className={classes.header}>
      {router.pathname !== '/' ? (
        <Link href="/">
          <a>{`Back `}</a>
        </Link>
      ) : null}
      <AlertMessage alert={alert} />
    </header>
  );
};

export default MainNavigation;
