const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const admin = require('./routes/admin');
const flight = require('./routes/flights');

app.use(bodyParser.json());

app.use('/admin',admin);
app.use('/flights',flight);

app.use(function(err,req,res,next){
    console.log(err);
    res.send({error:err}).status(400);
});









app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});
