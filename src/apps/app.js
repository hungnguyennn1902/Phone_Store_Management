const express=require("express");
const app = express();
const config=require("config");
const session = require('express-session');
//Config Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("app.session_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//Config View
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));
//Form
app.use(express.urlencoded({extended: true}));
//Static Folder
app.use("/static", express.static(config.get("app.static_folder")));

//Create Cart
app.use(require("./middlewares/cart"));
//Localstorage
app.use(require("./middlewares/share"));



//Router
app.use(require(config.get("app.router")));
module.exports = app;


