import React, {useState} from 'react';
import './Registration.css';
import axios from 'axios';

function Registration(){
    const [name, setName]=useState('');
    const [surname, setSurname]=useState('');
    const [login, setLogin]=useState('');
    const [password, setPassword]=useState('');

    const [nameColor, setNameColor]=useState('white');
    const [surnameColor, setSurnameColor]=useState('white');
    const [loginColor, setLoginColor]=useState('white');
    const [passwordColor, setPasswordColor]=useState('white');

    const regFun=(e) => {
        e.preventDefault();

        let nameFlag=false;
        let surnameFlag=false;
        let loginFlag=false;
        let pasFlag=false;

        let reg1=/[a-zA-Z]/g;
        let nameReg=name.replace(reg1, '');
        let surnameReg=surname.replace(reg1, '');
        
        let reg2=/[a-z]?(.|\-)+(\w+|\b)/g;
        let loginReg=login.replace(reg2, '');
        let passwordReg=password.replace(reg2, '');

        if(name.length == 0 || nameReg.length !== 0){
            setNameColor('rgb(229, 155, 155)');
            nameFlag=false;
        }
        else{
            setNameColor('white');
            nameFlag=true;
        }

        if(surname.length == 0 || surnameReg.length !== 0){
            setSurnameColor('rgb(229, 155, 155)');
            surnameFlag=false;
        }
        else{
            setSurnameColor('white');
            surnameFlag=true;
        }

        if(login.length == 0 || loginReg.length !== 0){
            setLoginColor('rgb(229, 155, 155)');
            loginFlag=false;
        }
        else{
            setLoginColor('white');
            loginFlag=true;
        }

        if(password.length == 0 || passwordReg.length !== 0){
            setPasswordColor('rgb(229, 155, 155)');
            pasFlag=false;
        }
        else{
            setPasswordColor('white');
            pasFlag=true;
        }

        if(nameFlag == true && surnameFlag == true && loginFlag == true && pasFlag == true){
            const user={
                name: name,
                surname: surname,
                login: login,
                password: password
            }
            axios.post('http://localhost:5000/api/registration', user)
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if(res.data === 'OK'){
                        alert('Correct Registration');
                    }
                    else{
                        alert('Change Login');
                    }
                });
        }

    }

    return(
        <div className='regDiv'>
            <input type='text' placeholder='Name' style={{backgroundColor: nameColor}}
                onChange={e => setName(e.target.value)} value={name} 
            />
            <input type='text' placeholder='Surname' style={{backgroundColor: surnameColor}}
                onChange={e => setSurname(e.target.value)} value={surname} 
            />
            <input type='text' placeholder='Login' style={{backgroundColor: loginColor}}
                onChange={e => setLogin(e.target.value)} value={login}
            />
            <input type='password' placeholder='Password' style={{backgroundColor: passwordColor}}
                onChange={e => setPassword(e.target.value)} value={password}
            />
            <button onClick={regFun}>Registration</button>
        </div>
    );
}

export default Registration;