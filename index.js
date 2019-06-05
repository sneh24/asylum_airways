const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mongoose=require('mongoose');
const ejs = require('ejs');

mongoose.connect("mongodb+srv://Razr7:batman123@cluster0-g0pwk.mongodb.net/test?retryWrites=true&w=majority",function(err){
    if(err){
        console.log(err);
    }
    else
    console.log("Atlas Connected");
});

app.set('view engine','ejs')

app.use(express.static('./public'));




//routes
const admin = require('./routes/admin');
const flight = require('./routes/flights');


//for post parsing
app.use(bodyParser.json());


//routing
app.use('/admin',admin);
app.use('/flights',flight);



//error handling
app.use(function(err,req,res,next){
    console.log(err);
    res.send({error:err}).status(400);
});





//server
app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});


