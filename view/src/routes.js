import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/';
import Catalog from './pages/Catalog';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/catologo/:categorie' component={Catalog} />
    </Switch>
  </BrowserRouter>
  )
}

export default  Routes;