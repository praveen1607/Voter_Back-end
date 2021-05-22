"use strict";

const mongoose=require("mongoose");

const partySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    shortForm:{
        type:String,
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model("Party",partySchema);