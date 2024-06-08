import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';

import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <main>
      <Navigation />
      <div className={styles.wrapper}>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};
export default SharedLayout;