"use strict";

const Nominee = require("../models/Nominee");
const User = require("../models/User");

module.exports = {
  
  addNominee: async (req, res) => {
    const checkRole=await User.findById(req.body.candidate);
    if(checkRole._doc.role!=="candidate"){
      return res.status(401).json({isError:true,error:"Only candidates can be added as nominees"});
    }
    // console.log(req.body);
    const findNominee = await Nominee.findOne({ candidate:req.body.candidate,election:req.body.election});
    if (findNominee) {
      return res
        .status(409)
        .json({
          isError: true,
          error: "Candidate already added as nominee to election",
        });
    } else {
      const nominee = new Nominee({ ...req.body });
      await nominee.save();
      const user = await User.findById(req.body.candidate);
      let newUser = {
        ...user._doc,
        nominations: [ ...user.nominations,nominee._doc._id],
      };
      console.log(newUser);
      await User.findByIdAndUpdate(req.body.candidate, newUser);
      return res
        .status(204)
        .json({ isError: false, message: "Nominee added successfully" });
    }
  },
  
  getAllNominees:async(req,res)=>{
    const nominees=await Nominee.find({}).populate("election").populate("candidate").populate("party");
    if(nominees===[]){
      return res.status(200).json({isError:true,message:"No nominees available"});
    }      
    return res.status(200).json({isError:false,message:"Nominees fetched successfully",nominees});
  },

  getNomineesForElection:async(req,res)=>{
    const nominees=await Nominee.find({election:req.body.electionID}).populate("candidate").populate("party");
    return res.status(200).json({isError:false,message:"Nominees fetched successfully",nominees});
  },

  getNomineesForApproval:async(req,res)=>{
    const newNominees=await Nominee.find({approved:false}).populate("candidate").populate("party").populate("election");
    return res.status(200).json({isError:false,message:"New Nominees fetched successfully",newNominees});
  },

  approveNewNominee:async(req,res)=>{
    const nominee = await Nominee.findById(req.params.nomineeID);
    await Nominee.findByIdAndUpdate(nominee._id, {     
      ...nominee._doc,
      ...req.body,
    });
    return res.status(201).json({
      isError: false,
      message:  "Nominee approved successfully",
    }); 
  },

  disapproveNominee:async(req,res)=>{
    await Nominee.findByIdAndDelete(req.body.nomineeID);
    return res.status(201).json({isError:false,message:"Nominee deleted successfully"});
  },

  deleteNominee:async (req,res)=>{
    const nominee=await Nominee.findById(req.body.nomineeId);
    const updatedUser=await User.findById(nominee._doc.candidate);
    const updatedNominees=updatedUser._doc.nominations.filter(nm=>nm!=req.body.nomineeId);
    updatedUser["nominations"]=updatedNominees;
    await User.findByIdAndUpdate(nominee._doc.candidate,updatedUser);
    await nominee.deleteOne()
    // await Nominee.findByIdAndDelete(req.body.nomineeId);
    return res.status(200).json({isError:false,message:"A nominee is deleted successfully"});
  },

  deleteAllNominees:async(req,res)=>{
    await Nominee.deleteMany({});
    return res.status(204).json({isError:false,message:"All the nominees deleted successfully"});
  }
  
};
