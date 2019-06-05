const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const adminModel = require('../models/adminModel');
const flightModel = require('../models/flightModel');

// mongoose.connect("mongodb+srv://Razr7:batman123@cluster0-g0pwk.mongodb.net/test?retryWrites=true&w=majority",function(err){
//     if(err){
//         console.log(err);
//     }
//     else
//     console.log("Atlas Connected");
// });

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


//get all data of one flight company
router.get('/getflights/:company',function(req,res,next){
    // let company=req.params.company;
    flightModel.find({company:req.params.company})
    .exec()
    .then(flight=>
    {
        res.send(flight);
    })
    .catch(next);
})


//post new flight
router.post('/addflight/:company',function(req,res,next){


    const newFlight = new flightModel({
        _id: new mongoose.Types.ObjectId(),
        flightno : req.body.flightno,
        time : req.body.time,
        from : req.body.from,
        to : req.body.to,
        price : req.body.price,
        seats : req.body.seats,
        company : req.params.company
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
})




//update timings
router.put('/update/:flightno',function(req,res){
    flightModel.findOneAndUpdate({flightno:req.params.flightno},{$set:{time:req.body.time}},function(err,doc){
        if(err){
            res.send(err).status(422);
        }
        else{
            res.send(doc).status(200);
        }
    })
    
});


// router.put('/update/:flightno', function(req, res,next)
// {
//     var flightno = req.params.flightno;
//     var object = req.body;

//     flightModel.updateObject(id, object, {}, function(err, object)
//     {
//         if (err)
//         {
//             res.json(err);
//         } 

//         res.json(object);
//     });
// }); 



// router.get('/uname=(',function(req,res,next){
//     let uname = req.params.uname;
//     let pword = req.params.pword;
    
    
//     console.log(uname);
//     console.log(pword);
// })



router.delete('/:ID',function(req,res){
    res.send("admin page delete").status(200);
});


module.exports = router;








