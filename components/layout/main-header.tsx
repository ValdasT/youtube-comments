import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './main-header.module.scss';

const MainNavigation = () => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      {router.pathname !== '/' ? (
        <Link href="/">
          <a>{`Back `}</a>
        </Link>
      ) : null}
    </header>
  );
};

export default MainNavigation;
