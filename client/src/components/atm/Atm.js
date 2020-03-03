import React, {useState} from 'react';
import './Atm.css';
import axios from 'axios';

function Atm(){
    const [login, setLogin]=useState('');
    const [password, setPassword]=useState('');
    const [money, setMoney]=useState(0);

    const [loginColor, setLoginColor]=useState('white');
    const [passwordColor, setPasswordColor]=useState('white');

    const sendMoneyFun=() => {
        if(login.length == 0){
            setLoginColor('rgb(229, 155, 155)');
        }
        else{
            setLoginColor('white');
        }

        if(password.length == 0){
            setPasswordColor('rgb(229, 155, 155)');
        }
        else{
            setPasswordColor('white');
        }

        let user={
            login: login, 
            password: password, 
            money: money
        }

        axios.post('http://localhost:5000/api/atm', user)
            .then(res => {
                console.log(res);
                console.log(res.data);

                if(res.data === 'error'){
                    alert('Error login or password');
                }
                else{
                    alert(`name-${res.data.name} surname-${res.data.surname} balance-${res.data.moneysum} dram. You sent ${money} dram.`)
                }
            });
    }
    return(
        <div className='atmDiv'>
            <input className='login' type='text' placeholder='Login' 
                style={{backgroundColor: loginColor}}
                onChange={e => setLogin(e.target.value)} value={login}
            />
            <input className='password' type='password' placeholder='Password' 
                style={{backgroundColor: passwordColor}}
                onChange={e => setPassword(e.target.value)} value={password}
            />
            <p>Send money</p>
            <input className='money' type='number' min='0' placeholder='Money'
                onChange={e => setMoney(e.target.value)} 
            />
            <button onClick={sendMoneyFun}>Enter</button>
        </div>
    );
}

export default Atm;