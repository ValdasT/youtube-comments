import { Fragment, ReactNode } from 'react';
import MainNavigation from './main-header';

const Layout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
