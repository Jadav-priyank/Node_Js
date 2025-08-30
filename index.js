const express = require("express");
const path = require("path");

const {logReqRes} = require('./middleware/mid');
const {connectMongoDb} = require("./connection");
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));
    
//connection
connectMongoDb("mongodb://127.0.0.1:27017/N-project-02");


//routes
app.use('/users' , userRouter);

//server
app.listen(port, () => console.log("server started at", port));