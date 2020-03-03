import React, {useState, useEffect} from 'react';
import './Books.css';
import axios from 'axios';

function Books(){
    const [title, setTitle]=useState('');
    const [author, setAuthor]=useState('');
    const [price, setPrice]=useState(0);
    const [number, setNumber]=useState(0);
    const [flag, setflag]=useState(false);
    const [booksArr, setBooksArr]=useState([]);
    
    const registBook=() => {
        let bookObj={
            title: title,
            author: author,
            price: price,
            number: number
        }

        setflag(!flag);

        axios.post('http://localhost:5000/api/admin-allbooks', bookObj)
            .then(res => {
                console.log(res.data);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin-allbooks')
            .then(res => {
                setBooksArr(res.data); 
            })
    }, [flag]);

    const deleteFun=(id) =>{
        setflag(!flag);
        
        axios.delete(`http://localhost:5000/api/admin-deletebooks/${id}`)
            .then(res => {
                console.log(res.data);
            });
    } 
    return(
        <div>
            <p className='titleP'>Registerate new book</p>
            <input className='titleInput' type='text' placeholder='Title of book'
                onChange={e => setTitle(e.target.value)} value={title}
            />
            <input className='authorInput' type='text' placeholder='Аuthor of book'
                onChange={e => setAuthor(e.target.value)} value={author}
            />
            <input className='priceInput' type='number' min='0' placeholder='Price of book'
                onChange={e => setPrice(e.target.value)} 
            />
            <input className='numberInput' type='number' min='0' placeholder='Number of books'
                onChange={e => setNumber(e.target.value)} 
            />
            <button className='registButton' onClick={registBook}>Enter</button>
            <p className='titleP'>All books</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title of book</th>
                            <th>Author of book</th>
                            <th>Price of book (dram)</th>
                            <th>Number of books</th>
                            <th>Delate book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksArr.map((book, index) => ( 
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title} </td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>{book.number}</td>
                                <td className='deleteBook' onClick={deleteFun.bind(this, book.id)}>
                                    Delete
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;