"use strict";

const mongoose = require("mongoose");

const passwordHash = require("password-hash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  collegeID: {
    type: String,
    // validate(value) {
    //   if (JSON.stringify(value).length != 12)
    //     throw new Error("Invalid aadhaar Number");
    // },
    required:true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  gender:{
    type:String
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
  },
  nominations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:"Nominee"
  },
  approved:{
    type:Boolean,
    default:false,
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.password) {
      const hashedPassword = passwordHash.generate(this.password);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods = {
  authenticate: function(enteredPass) {
    return passwordHash.verify(enteredPass, this.password)
  },
};

module.exports = mongoose.model("User", userSchema);
