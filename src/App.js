import React from 'react'
import './style.css'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Header from './common/Header'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import NotFound from './common/NotFound'

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/products' component={Products} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
