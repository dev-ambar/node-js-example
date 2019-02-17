const express = require('express');
//import express from "express";

const bodyParser = require('body-parser');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded

//app.use(bodyParser.urlencoded({ extended:true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());



//define a simple route

app.get('' , (req, res) => {
	res.json({'message' : 'Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.'});
});


// listen for requests
app.listen(3000, () =>{
	console.log('Server is listening on port 3000');
});


//configuring the database

const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then( () => {
	
	console.log('Successfully Connceted from Mongo DB');
}).catch( err => {
	console.log(' Failed to Connect with DB', err);
	process.exit();
});


require('./app/routes/note.routes.js')(app);