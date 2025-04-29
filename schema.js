const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }

});


const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    menu:[menuSchema]
});

const  restaurantSchema = mongoose.model("restaurant details",schema);

module.exports = restaurantSchema;