"use strict";

const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const userSearch = await User.findOne({ collegeID: req.body.collegeID });
    // console.log(userSearch);
    if (userSearch) {
      return res
        .status(400)
        .json({ isError: true, error: "The college ID is already in use" });
    } else {
      const user = new User({
        ...req.body,
        role: req.params.userRole,
      });
      const savedUser = await user.save();
      if (!savedUser)
        return res.status(400).json({ isError: true, error: savedUser });
      return res.status(201).json({
        isError: false,
        message: req.params.userRole + " created successfully",
        user: savedUser._doc,
      });
    }
  },

  viewUser: async (req, res) => {
    const user = await User.findOne({ collegeID: req.body.collegeID });
    if (!user) {
      return res
        .status(404)
        .json({ isError: true, message: "Not a valid College ID" });
    } else {
      return res
        .status(200)
        .json({
          isError: false,
          message: user._doc.name + "'s info fetched successfully",
          user: user._doc,
        });
    }
  },

  loginUser: async (req, res) => {
    const user = await User.findOne({ collegeID: req.body.collegeID }).populate("nominations");
    if (!user) {
      return res
        .status(404)
        .json({ isError: true, message: "Not a valid College ID" });
    }
    // console.log(req.body);
    if (user.authenticate(req.body.password)) {
      return res.status(200).json({
        isError: false,
        message: user._doc.name + " logged in successfully",
        user: user._doc,
      });
    } else {
      return res
        .status(200)
        .json({ isError: true, message: "Password entered is incorrect" });
    }
  },

  updateUser: async (req, res) => {
    const userInfo = await User.findOne({ collegeID: req.body.collegeID });
    const updatedUser = await User.findByIdAndUpdate(userInfo._id, {     
      ...userInfo._doc,
      ...req.body,
    });
    return res.status(201).json({
      isError: false,
      message:  "Information updated successfully",
    });
  },

  deleteUser: async (req, res) => {
    await User.findOneAndDelete({ collegeID: req.body.collegeID });
    // await User.findOneAndDelete({ name: req.body.name });
    return res
      .status(200)
      .json({ isError: false, message: "A single user deleted successfully" });
  },
  
  viewAllUsers:async (req,res)=>{
    const usersList=await User.find({});
    return res.status(200).json({isError:"false",message:"Users List fetched successfully",total:usersList.length,list:usersList});
  },

  deleteAllUsers:async (req,res)=>{
    await User.remove({});
    return res
      .status(200)
      .json({ isError: false, message: "All Users deleted successfully" });
  }
};
