const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash')
const router = express.Router()
const { reset } = require('nodemon')
const app = express()
const port = 5000


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dating_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Now Connected to Server!'))
    .catch(err => console.error('Something went wrong', err));
//const db = mongoose.connection;

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

var User = mongoose.model("User", userSchema)


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.static(`public`))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//GET METHODS
app.get('', (req,res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/showsignup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html')
})

app.get('/showlogin', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.get('/dashboard/', (req, res) => {
    reset.sendFile(__dirname + '/views/dashboard.html')
})

//POST METHODS
app.post('/user/signup', (req, res) => {
    try {
        var user = {};
        user.firstname = req.body.first_name;
        user.lastname = req.body.last_name;
        user.email = req.body.email;
        user.password = passwordHash.generate(req.body.password);   
        var userData = new User(user)
        console.log(userData)
        userData.save()
        res.redirect('/showlogin')
    }
    catch {
        res.redirect('/showsignup')
    }
})


app.listen(port, ()=> console.log(`Listening on Port ${port}...`))