var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
const fs = require('fs')
// process.argv.push(process.argv.shift())
var port = process.argv[2] || 3000;
var state = [];

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('.'));//set dirctory to serve file

app.get('/', function (req, res, next) {
    res.render('index', { title: 'Welcome to form demo' });
});

app.post('/add', function (req, res) {
    var obj = {
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        birthday: req.body.birthday,
        email: req.body.email,
        phoneNumber: req.body.phone
    };
    state.push(obj);
    res.redirect('/list');
});

//delete a name
app.post('/delete', function (req, res) {
    const newState = state.filter(e => e.name !== req.body.nameDelete)
    state = newState
    res.render('delete', { title: 'deleted a name', items: state })
})

app.get('/list', function (req, res) {
    res.render('list', { title: 'People Listing', items: state });
});

//read prevState.json file
var serverUp = function () {
    console.log("listening on port " + port);
    fs.readFile('prevState.json', (err, data) => {
        if (err) throw err
        let dataObj = JSON.parse(data)
        state = dataObj
    })
}

//save file
var serverDown = function () {
    console.log("Server shutting down.");
    fs.writeFile('prevState.json', JSON.stringify(state), 'utf8', err => {
        if (err) throw err
        process.exit(0)
    })
}

var server = http.createServer(app);
server.listen(port);
server.on('listening', serverUp);
process.on('SIGINT', serverDown);
