import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';

import Shop from './components/shop/Shop';
import Registration from './components/registration/Registration';
import Atm from './components/atm/Atm';
import InsideShop from'./components/insideShop/InsideShop';
import Admin from './components/admin/Admin';

function App() {
  return (
    <div>
      <Router>
        <NavLink className='home' to='/' exact activeStyle={{color: 'red'}}>Home</NavLink>
        <NavLink className='shop' to='/shop' exact activeStyle={{color: 'red'}}>Go To Shop</NavLink>
        <NavLink className='registration' to='/registration' exact activeStyle={{color: 'red'}}>Registration</NavLink>
        <NavLink className='atm' to='atm' exact activeStyle={{color: 'red'}}>ATM</NavLink>

        <Route path='/shop' exact strict component={Shop} />
        <Route path='/registration' exact strict component={Registration} />
        <Route path='/atm' exact strict component={Atm} />
        <Route path='/insideShop'exact strict component={InsideShop} />
        <Route path='/admin'exact strict component={Admin} />
      </Router>
    </div>
  );
}

export default App;
