import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CheckList from '../Pages/CheckListPage/CheckListPage';
import Table from '../Pages/Table/TablePage';
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
          <CheckList />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
      </Switch>
    </div>
  );
};

export default AppContent;
