const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const adminModel = require('../models/adminModel');

mongoose.connect("mongodb+srv://Razr7:batman123@cluster0-g0pwk.mongodb.net/test?retryWrites=true&w=majority",function(err){
    if(err){
        console.log(err);
    }
    else
    console.log("Atlas Connected");
});

router.post('/',function(req,res,next){

    const newAdmin = new adminModel({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email,
        password : bcryptjs.hashSync(req.body.password,10),
        company : req.body.company
    });

    adminModel.find({email:req.body.email})
    .exec()
    .then(admin=>{
        if(admin.length>0){
            res.send("Account already exists").status(400);
        }
        else{
            newAdmin.save();
            res.send("Account created").status(201);
        }
    })
    .catch(next);

});


router.get('/',function(req,res){
    res.send("admin page post").status(200);
});


// router.get('/uname=(',function(req,res,next){
//     let uname = req.params.uname;
//     let pword = req.params.pword;
    
    
//     console.log(uname);
//     console.log(pword);
// })

router.put('/:ID',function(req,res){
    res.send("admin page put").status(200);
});

router.delete('/:ID',function(req,res){
    res.send("admin page delete").status(200);
});


module.exports = router;