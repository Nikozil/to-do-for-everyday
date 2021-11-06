import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import SpinComponent from '../../assets/SpinComponent/SpinComponent';
import { getTasks } from '../../Redux/modules/tasksSlice';
// import CheckListPage from '../Pages/CheckListPage/CheckListPage';
// import Settings from '../Pages/SettingsPage/SettingsPage';
import Table from '../Pages/Table/TablePage';
// import TomorrowListPage from '../Pages/TomorrowListPage/TomorrowListPage';
import styles from './AppContent.module.scss';

const CheckListPage = React.lazy(
  () => import('../Pages/CheckListPage/CheckListPage')
);
const TomorrowListPage = React.lazy(
  () => import('../Pages/TomorrowListPage/TomorrowListPage')
);
const HistoryPage = React.lazy(
  () => import('../Pages/HistoryPage/HistoryPage')
);
const Settings = React.lazy(() => import('../Pages/SettingsPage/SettingsPage'));
const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div className={styles.content}>
      <Suspense
        fallback={
          <div className={styles['spin__container']}>
            <SpinComponent styleClass={styles['spin__spinner']} />
          </div>
        }>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/checkList" />}></Route>
          <Route path="/checkList">
            <CheckListPage />
          </Route>
          <Route path="/tomorrowList">
            <TomorrowListPage />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/history">
            <HistoryPage />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default AppContent;
