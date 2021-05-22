"use strict";

const moment=require("moment");

const Election = require("../models/Election");

module.exports = {
  createElection: async (req, res) => {
    const election = new Election(req.body);
    await election.save();
    return res.status(201).json({
      isError: false,
      message: "Election created successfully",
      election: election._doc,
    });
  },

  findElectionByLocation: async (req, res) => {
    let elections = await Election.find({
      startTime: { $lte: req.body.date },
      endTime: { $gte: req.body.date },
      location:req.body.location
    });
    if (elections.length===0) {
      return res
        .status(400)
        .json({ isError: true, error: "No such election exists" });
    }
    return res
      .status(200)
      .json({
        isError: false,
        message: "Election found successfully",
        elections,
      });
  },

  findUpComingElections:async(req,res)=>{
    const upcomingElections=await Election.find({startTime:{$gte:req.body.date}});
    return res.status(200).json({isError:false,message:"Upcoming elections fetched successfully",upcomingElections});
  },

  findUpComingElectionsForContesting:async(req,res)=>{
    const upcomingElections=await Election.find({endTime:{$gte:req.body.date},location:req.body.location});
    return res.status(200).json({isError:false,message:"Upcoming elections fetched successfully",upcomingElections});
  },

  getAllElections:async (req,res)=>{
    const electionsList=await Election.find({});
    return res.status(200).json({
      isError:false,
      message:"Election list fetched successfully",
      electionsList
    })
  },

  deleteElection:async(req,res)=>{
    console.log(req.body);
    await Election.findByIdAndRemove(req.body.electionID);
    return res.status(204).json({isError:false,message:"The election info deleted successfully"});
  },


  deleteAllElections:async (req,res)=>{
    await Election.remove({});
    return res.status(204).json({isError:false,message:"All the elections deleted successfully"});
  }
};
