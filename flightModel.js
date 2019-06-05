const mongoose = require('mongoose');
const flightSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    flightno : {type:String,required:true},
    time : {type:Date,required:true},
    from : {type:String,required:true},
    to : {type:String,required:true},
    price : {type:Number,required:true},
    seats : {type:Number,required:true},
    company : {type:String,required:true}

});

module.exports = mongoose.model('Flights',flightSchema);