"use strict";

const User = require("../models/User");

module.exports = {
  
  getAllCandidates: async (req, res) => {
    const candidates = await User.find({role:"candidate"});
    return res.status(200).json({ isError:false,message:"Candidates' list fetched successfully",candidates });
  }, 

  getApprovedCandidates:async (req,res)=>{
    const approvedCandidates=await User.find({role:"candidate",approved:true});
    return res.status(200).json({isError:false,message:"Approved Candidates fetched successfully",approvedCandidates});
  },

  getCandidatesForApproval:async(req,res)=>{
    const newCandidates=await User.find({role:"candidate",approved:false});
    return res.status(200).json({isError:false,message:"New Candidates fetched successfully",newCandidates});
  },

  getPartyCandidates: async (req, res) => {
    // console.log(req.params.partyID);
    const candidates = await User.find({role:"candidate",approved:true}).populate("nominations");
    const requiredCandidates=candidates.filter((candidate)=>{
      return candidate.nominations.length && candidate.nominations.filter((nomination)=>nomination.party==req.params.partyID).length;
    })
    return res.status(200).json({ isError:false,message:"Candidates' list fetched successfully",candidates:requiredCandidates });
  }, 
};
