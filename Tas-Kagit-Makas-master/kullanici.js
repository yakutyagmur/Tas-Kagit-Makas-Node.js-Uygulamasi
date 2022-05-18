var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var fs = require('fs');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'kullanici'
});

var app = express();

// Static Middleware 
app.use(express.static(path.join(__dirname, 'public'))) 
  
// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/index.html', function(req, res){ 
    res.render('index') 
}) 


app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/form.html'));

});

app.get('/index.html', function (request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));

});


app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM kullanicilar WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/kayit', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	if(true){
		connection.query('INSERT INTO accounts (username, password) VALUES ?',[username,password],function(error, results,fields){
			if(true){
				request.session.register = true;
				request.session.password = password;
				response.redirect('/index.html');
			}
		})
	}
});







app.listen(8000);