import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CheckList from '../Pages/CheckListPage/CheckListPage';
import Table from '../Pages/Table/TablePage';
import styles from './AppContent.module.css';

const AppContent = () => {
  return (
    <div className={styles.content}>
      <Switch>
        <Route path="/checkList" render={() => <CheckList />}></Route>
        <Route path="/table" render={() => <Table />}></Route>
        <Route path="/">
          <Redirect to="/checkList" />
        </Route>
      </Switch>
    </div>
  );
};

export default AppContent;
