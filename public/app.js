import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import mainRouter from "./config/router.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinaryConfig } from "./config/cloudinaryconfig.js";
import dotenv from 'dotenv';
import MemoryStore from "memorystore";

var app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var store = MemoryStore(session);

app.use(bodyParser.urlencoded({extended: true}));
app.use("*", cloudinaryConfig);

app.use(session({
    secret: 'sessionsecretkey',
    resave: false,
    saveUninitialized: true,
    store: new store({checkPeriod: 86400000}),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  }));

app.use(express.static(path.join(__dirname, "./assets")));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/fonts', express.static(path.join(__dirname,'../node_modules/@fortawesome/fontawesome-free')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); 
app.use("/", mainRouter);

app.listen(8000, function() {
    console.log("listening on port 8000");
});