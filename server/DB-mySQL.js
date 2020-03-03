const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    database: "bookshop",
    user: "root",
    password: ""
});

connection.query("CREATE TABLE users(id int NOT NULL AUTO_INCREMENT, name varchar(15), surname varchar(25), login varchar(20), password varchar(20), moneysum int(11), PRIMARY KEY(id))", 
    (err, result) => {
        if (err) throw err;
        console.log("Table users created");
});


connection.query("CREATE TABLE shopping(id int NOT NULL AUTO_INCREMENT, name varchar(15), surname varchar(25), login varchar(20), title varchar(50), author varchar(40), price int(11), dateofbuy varchar(50), PRIMARY KEY(id))", 
    (err, result) => {
        if (err) throw err;
        console.log("Table shopping created");
});


connection.query("CREATE TABLE allbooks(id int NOT NULL AUTO_INCREMENT, title varchar(50), author varchar(40), price int(11),  number int(11), PRIMARY KEY(id))", 
    (err, result) => {
        if (err) throw err;
        console.log("Table allbooks created");
});

