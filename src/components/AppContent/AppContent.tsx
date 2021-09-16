import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CheckList from '../Pages/CheckListPage/CheckListPage';
import Table from '../Pages/Table/TablePage';
import styles from './AppContent.module.css';

const AppContent = () => {
  return (
    <div className={styles.content}>
      <Switch>
        <Route path="/checkList" render={() => <CheckList />}></Route>
        <Route path="/table" render={() => <Table />}></Route>
      </Switch>
    </div>
  );
};

export default AppContent;
