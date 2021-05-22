"use strict";

const User = require("../models/User");

module.exports = {
  
  getAllVoters: async (req, res) => {
    const voters = await User.find({role:"voter"});
    return res.status(200).json({ isError:false,message:"Voters list fetched successfully",voters });
  }, 
};
