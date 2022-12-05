import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import mainRouter from "./config/router.js";
import path from 'path';
import { fileURLToPath } from 'url';

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended: true}));

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

app.set('view engine', 'ejs');
app.use("/", mainRouter);

app.listen(8000, function() {
    console.log("listening on port 8000");
});