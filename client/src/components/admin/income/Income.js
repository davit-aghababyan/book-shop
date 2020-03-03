import React, {useState, useEffect} from 'react';
import './Income.css';
import axios from 'axios';


function Income(){
    const [arrIncome, setArrIncome]=useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin-income')
            .then(res => {
                console.log(res.data);
                setArrIncome(res.data);
            });
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>User name</th>
                        <th>User surname</th>
                        <th>User login</th>
                        <th>Title of book</th>
                        <th>Auther of book</th>
                        <th>Price of book (dram)</th>
                        <th>Date of buy</th>
                    </tr>
                </thead>
                <tbody>
                    {arrIncome.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.login}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.price}</td>
                            <td>{item.dateofbuy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Income;