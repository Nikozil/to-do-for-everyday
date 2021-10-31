import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CheckListPage from '../Pages/CheckListPage/CheckListPage';
import Settings from '../Pages/SettingsPage/SettingsPage';
import Table from '../Pages/Table/TablePage';
import TomorrowListPage from '../Pages/TomorrowListPage/TomorrowListPage';
import styles from './AppContent.module.scss';

const AppContent = () => {
  return (
    <div className={styles.content}>
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
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="*">404</Route>
      </Switch>
    </div>
  );
};

export default AppContent;
