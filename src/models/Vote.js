"use strict";

const mongoose=require("mongoose");

const voteSchema=new mongoose.Schema({
  voteTime:{
    type:Date,
    required:true,
  },
  collegeID:{
    type:String,
  },
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Party"
  },
  candidate:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  election:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Election"
  },
})

module.exports=mongoose.model("Vote",voteSchema);