import React, { useMemo } from 'react'
import './style.css'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Header from './common/Header'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Products from './components/Products'
import Cart from './components/Cart'

export default function App() {
  const user = useMemo(() => {
    return global.auth.getUser() || {}
  }, [])
  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
