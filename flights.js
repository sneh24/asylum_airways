const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const flightModel = require('../models/flightModel');

mongoose.connect("mongodb+srv://Razr7:batman123@cluster0-g0pwk.mongodb.net/test?retryWrites=true&w=majority",function(err){
    if(err){
        console.log(err);
    }
    else
    console.log("Atlas Connected");
});
router.get('/',function(req,res){
    res.send("flights page").status(200);
})



router.post('/',function(req,res,next){

    const newFlight = new flightModel({
        _id: new mongoose.Types.ObjectId(),
        flightno : req.body.flightno,
        time : req.body.time,
        from : req.body.from,
        to : req.body.to,
        price : req.body.price,
        seats : req.body.seats,
        company : req.body.company
    });
    flightModel.find({flightno:req.body.flightno})
    .exec()
    .then(flight=>{
        if(flight.length>0){
            res.send("flight already exists").status(400);
        }
        else{
            newFlight.save();
            res.send("flight added").status(201);
        }
    })
    .catch(next);

    
});




module.exports = router;