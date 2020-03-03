const express=require('express');
const mysql = require('mysql2');

const router=express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    database: "bookshop",
    user: "root",
    password: ""
});

router.post('/registration', (req, res) => {
    if(req.body.login == 'admin'){
        res.send('error login');
    }
    else{
        connection.query(`SELECT * FROM users WHERE login='${req.body.login}'`, (err, data) => {
            if(data.length == 0){
                connection.query(`INSERT INTO users(name, surname, login, password, moneysum) VALUES('${req.body.name}', '${req.body.surname}', '${req.body.login}', '${req.body.password}', 0)`);
                res.sendStatus(200);
            }
            else{
                res.send('error login');
            }
        }); 
    }
   
});

router.post('/atm', (req, res) => {
    connection.query(`SELECT * FROM users WHERE login='${req.body.login}' AND password='${req.body.password}'`, (err, data) => {
        if(data.length !== 0){
            connection.query(`UPDATE users SET moneysum=${data[0].moneysum + Number(req.body.money)} WHERE login='${req.body.login}'`);
            res.send({
                name: data[0].name,
                surname: data[0].surname,
                moneysum: data[0].moneysum + Number(req.body.money)
            });
        }
        else{
            res.send('error');
        }
    });
});

router.post('/gotoshop', (req, res) => {
    if(req.body.login == 'admin' && req.body.password == 'admin'){
        res.send('admin');
    }
    else{
        connection.query(`SELECT * FROM users WHERE login='${req.body.login}' AND password='${req.body.password}'`, (err, data) => {
            if(data.length !== 0){
                res.send({
                    name: data[0].name,
                    surname: data[0].surname,
                    moneysum: data[0].moneysum
                });
            }
            else{
                res.send('error');
            }
        });
    }
});

router.get('/admin-users', (req, res) => {
    connection.query(`SELECT id, name, surname, login, moneysum FROM users`, (err, result) => {
        res.send(result);
    });
});

router.get('/admin-income', (req, res) => {
    connection.query(`SELECT * FROM shopping`, (err, result) => {
        res.send(result);
    });
});

router.post('/admin-allbooks', (req, res) => {
    connection.query(`INSERT INTO allbooks( title, author, price, number) VALUES('${req.body.title}', '${req.body.author}', '${req.body.price}', '${req.body.number}')`);
    res.sendStatus(200);
});

router.get('/admin-allbooks', (req, res) => {
    connection.query(`SELECT * FROM allbooks`, (err, result) => {
        res.send(result);
    });
});

router.delete('/admin-deletebooks/:id', (req, res) => {
    let idBook=req.params.id;
    connection.query(`DELETE FROM allbooks WHERE id=${idBook}`);
    res.sendStatus(200);
});

router.get('/user-data/:login', (req, res) => {
    let userLogin=req.params.login;
    connection.query(`SELECT * FROM users WHERE login='${userLogin}'`, (err, data) => {
        res.send({
            name: data[0].name,
            surname: data[0].surname,
            moneysum: data[0].moneysum
        });
    });
});

router.get('/user-allbooks', (req, res) => {
    connection.query(`SELECT id, title, author, price FROM allbooks WHERE number <> 0`, (err, result) => {
        res.send(result);
    });
});

router.post('/user-book', (req, res) => {

    let  idBook=req.body.id;
    let loginUser=req.body.login;

    connection.query(`SELECT title, author, price, number FROM allbooks WHERE id=${idBook}`, (err, bookData) => {
        connection.query(`SELECT name, surname, moneysum FROM users WHERE login='${loginUser}'`, (err, userData) => {
            if(bookData[0].price <= userData[0].moneysum){
                connection.query(`UPDATE allbooks SET number=${bookData[0].number - 1} WHERE id=${idBook}`);
                connection.query(`UPDATE users SET moneysum=${userData[0].moneysum - bookData[0].price} WHERE login='${loginUser}'`);
                connection.query(`INSERT INTO shopping(name, surname, login, title, author, price, dateofbuy) VALUES('${userData[0].name}', '${userData[0].surname}', '${loginUser}', '${bookData[0].title}', '${bookData[0].author}', '${bookData[0].price}', '${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()} --- ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}')`);
                res.sendStatus(200);
            }
            else{
                res.send('error');
            }
        });
    });
});


module.exports=router;