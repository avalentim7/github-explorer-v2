import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Repository from '../components/Repository/Repository';

function Routes() { 
  return (
    <Switch>
      <Route path="/" exact component={Dashboard}/>
      <Route path="/repository/:repository+" exact component={Repository}/>
    </Switch>
  )
}

export default Routes;