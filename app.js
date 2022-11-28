var express = require("express");
const path = require("path");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var session = require('express-session');
app.use(session({
    secret: 'sessionsecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  }));

app.use(express.static(path.join(__dirname, "./assets")));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/fonts', express.static(path.join(__dirname,'node_modules/@fortawesome/fontawesome-free')));

const mainRouter = require("./config/router");
app.set('view engine', 'ejs');
app.use("/", mainRouter);

app.listen(8000, function() {
    console.log("listening on port 8000");
});