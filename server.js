const express = require('express')
const app = express()
const port = 5000

app.use(express.static(`public`))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.get('', (req,res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/showsignup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html')
})

app.get('/showlogin', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.listen(port, ()=> console.info(`Listening on Port ${port}`))