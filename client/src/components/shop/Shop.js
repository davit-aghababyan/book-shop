import React, {useState} from 'react';
import './Shop.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Shop(){
    const [login, setLogin]=useState('');
    const [password, setPassword]=useState('');

    const [address, setAddress]=useState('/shop');


    const shopFun=() => {
        let user={
            login: login,
            password: password
        }
        
        axios.post('http://localhost:5000/api/gotoshop', user)
            .then(res => {
                // console.log(res);
                // console.log(res.data);

                if(res.data === 'error'){
                    alert('Error login or password.');
                    setAddress('/shop');
                }
                else if(res.data === 'admin'){
                    alert(`Hello and welcome Admin. Press 'Go to shop' button.`);
                    setAddress('/admin');
                }
                else{
                    alert(`Name - ${res.data.name}, Surnmae - ${res.data.surname}, Balance - ${res.data.moneysum} dram. Press 'Go to shop' button.`);
                    setAddress(`/insideShop?login=${login}`);
                }
            });
    }

    return(
        <div className='shopDiv'>
            <input type='text' placeholder='Login'
                onChange={e => setLogin(e.target.value)} value={login}
            />
            <input type='password' placeholder='Password'
                onChange={e => setPassword(e.target.value)} value={password}
            />
            <button className='buttonEnter' onClick={shopFun}>Enter</button>
            <Link to={address} style={{ textDecoration: 'none' }} >
                <button>Go to shop</button>
            </Link>
        </div>
    );
}

export default Shop;
