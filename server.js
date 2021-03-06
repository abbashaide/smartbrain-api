//Dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controllers
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

//Connecting to Database
const dB = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

//Middlewares
app.use(cors());
app.use(express.json());  //bodyParser within express


//Requests to endpoints
app.get('/', (req, res) => { 
	res.send('it is working!');
})

app.post('/signin', signin.handleSignin(dB, bcrypt))   //another way of doing it as it will automatcally passing (req, res) after passing
//																											 the handleSignin function (dB, bycrypt). goto signin.js file for more understanding	
app.post('/register', (req, res) => { 
	register.handleRegister(req, res, dB, bcrypt);
})

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, dB);
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, dB);
})

app.post('/imageURL', (req, res) => {
	image.handleApiCall(req, res);
})


app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port 3000')
})






/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/