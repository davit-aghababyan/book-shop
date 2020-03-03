import React, {useState, useEffect} from 'react';
import './Users.css';
import axios from 'axios';


function Users(){
    const [arrUsers, setArrUsers]=useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin-users')
            .then(res => {
                console.log(res.data);
                setArrUsers(res.data);
            });
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Login</th>
                        <th>Balance of money (dram)</th>
                    </tr>
                </thead>
                <tbody>
                    {arrUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.login}</td>
                            <td>{user.moneysum}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;