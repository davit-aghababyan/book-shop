import React, {useState, useEffect} from 'react';
import './insideShop.css';
import queryString from 'query-string';
import axios from 'axios';

function InsideShop(){
    const [userData, setUserData]=useState({});
    const [booksArr, setBooksArr]=useState([]);
    const [userLogin, setUserLogin]=useState('');
    const [flag, setFlag]=useState(true);
    
    useEffect(() => {
        const data=queryString.parse(window.location.search)
        
        setUserLogin(data.login);

        axios.get(`http://localhost:5000/api/user-data/${data.login}`)
            .then(res => {
                setUserData(res.data); 
            });
    }, [flag]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user-allbooks`)
            .then(res => {
                setBooksArr(res.data);
            });
    }, [flag]);

    const buyBookFun=(id, title, author) => {
        const obj={
            id: id,
            login: userLogin
        }

        setFlag(!flag);

        axios.post(`http://localhost:5000/api/user-book`, obj)
            .then(res => {
                if(res.data == 'OK'){
                    alert(`You are buy book - title: ${title}, author: ${author}.`);
                }
                else{
                    alert(`You don't have enough money.`);
                }
            });
    }

    return(
        <div>
            <p className='pUserData'>
                <span className='spanUserData'>Name: {userData.name}</span>
                <span className='spanUserData'>Surname: {userData.surname}</span>
                <span className='spanUserData'>Balance: {userData.moneysum} dram</span>
            </p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title of book</th>
                            <th>Author of book</th>
                            <th>Price of book (dram)</th>
                            <th>Buy the book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksArr.map((book, index) => ( 
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title} </td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td className='buyBook' onClick={buyBookFun.bind(this, book.id, book.title, book.author)}>
                                    Buy
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InsideShop;