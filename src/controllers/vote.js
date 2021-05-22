"use strict";

const mongoose=require("mongoose");

const Vote = require("../models/Vote");
const Nominee=require("../models/Nominee");
const Election = require("../models/Election");

module.exports = {
  castVote: async (req, res) => {
    const searchVote = await Vote.findOne({
      collegeID: req.body.collegeId,
      election: mongoose.Types.ObjectId(req.body.election),
    });
    if (searchVote) {
      return res
        .status(409)
        .json({ isError: true, error: "Already voted for the election" });
    } else {
      //voteTime,collegeID,party(id),candidate(id),election(id)
      const vote = new Vote({
        ...req.body,
      });
      await vote.save();
      return res
        .status(201)
        .json({ isError: false, message: "Vote casted successfully" });
    }
  },

  checkStatus: async (req, res) => {
    const vote = await Vote.findOne({
      collegeID: req.body.collegeId,
      election: mongoose.Types.ObjectId(req.body.election),
    });
    if(vote){
        return res.status(200).json({isError:true,error:"Already voted for this election"});
    }else{
        return res.status(200).json({isError:false,message:"Election is open for voting"});
    }
  },

  getListOfCandidates:async(req,res)=>{
    const nominees=await Nominee.find({...req.body}).populate('candidate').populate('party').populate('election');
    return res.status(200).json({isError:false,message:"All the candidates for the election fetched",nominees});
  },

  getAllVotes:async (req,res)=>{
    const votes=await Vote.find({});
    return res.status(200).json({isError:false,message:"All the votes fetched successfully",votes});
  },

  getStats:async(req,res)=>{
    const votes=await Vote.find({election:req.body.electionID}).populate('candidate').populate('party');
    return res.status(200).json({isError:false,message:'Vote Stats fetched successfully',stats:votes});
  },


  deleteAllVotes:async (req,res)=>{
    await Vote.remove({});
    return res.status(204).json({isError:false,message:"All the votes deleted successfully"});
  }
};
