import React from 'react';
import './Admin.css';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import Users from './users/Users';
import Income from './income/Income';
import Books from './books/Books';

function Admin(){
    return(
        <div>
            <h1>ADMIN</h1>
            <Router>
                <NavLink className='adminLinks' to='/users' exact activeStyle={{color: 'red'}}>Show users</NavLink>
                <NavLink className='adminLinks' to='/books' exact activeStyle={{color: 'red'}}>Show books</NavLink>
                <NavLink className='adminLinks' to='/Income' exact activeStyle={{color: 'red'}}>Income</NavLink>

                <Route path='/users' exact strict component={Users} />
                <Route path='/books' exact strict component={Books} />
                <Route path='/income' exact strict component={Income} />
            </Router>
        </div>
    );
}

export default Admin;