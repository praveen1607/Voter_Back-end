"use strict";

const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema({
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approved:{
    type:Boolean
  }
});

nomineeSchema.pre("find",async function (next){
  try{
    if(this.election){
      this.election=await mongoose.Types.ObjectId(this.election);
    }
    next();
  }catch(err){
    next(err);
  }
})

nomineeSchema.pre("findOne", async function (next) {
  try {
    if (this.party) {
      this.party = await mongoose.Types.ObjectId(this.party);
    }
    if (this.election) {
      this.election = await mongoose.Types.ObjectId(this.election);
    }
    if (this.candidate) {
      this.candidate = await mongoose.Types.ObjectId(this.candidate);
    }
    next();
  }catch(err){
    next(err);
  }
});

module.exports = mongoose.model("Nominee", nomineeSchema);
