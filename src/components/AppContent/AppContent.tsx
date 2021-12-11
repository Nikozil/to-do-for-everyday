import { endOfDay, getTime } from 'date-fns';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createSelector } from 'reselect';
import SpinComponent from '../../assets/SpinComponent/SpinComponent';
import { getTasks } from '../../Redux/modules/tasksSlice';
import { AppStateType } from '../../Redux/store';
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
  const selectEndOfDay = createSelector(
    (state: AppStateType) => state.clock.time,
    (time) => getTime(endOfDay(time))
  );
  const today = useSelector(selectEndOfDay);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, today]);

  return (
    <div className={styles.content}>
      <Suspense
        fallback={
          <div className={styles['preloader']}>
            <SpinComponent styleClass={styles['preloader__spinner']} />
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
