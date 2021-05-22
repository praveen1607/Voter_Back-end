"use strict";

const Party = require("../models/Party");

module.exports = {
  getAllParties: async (req, res) => {
    const partyList = await Party.find({});
    return res.status(200).json({isError:false, partyList });
  },

  createParty: async (req, res) => {
    const partySearch = await Party.findOne({ name: req.body.name });
    if (partySearch !== null) {
      return res.status(400).json({
        isError: true,
        error: "A party with the given name is already created",
      });
    } else {
      const party = new Party({
        ...req.body,
      });
      const savedParty = await party.save();
      if (savedParty instanceof Error)
        return res.status(400).json({ isError: true, error: savedParty });
      return res.status(201).json({
        message: req.body.name + " party created successfully",
        party: savedParty._doc,
      });
    }
  },

  updateParty:async(req,res)=>{
    await Party.findByIdAndUpdate(req.params.partyID,req.body);
    return res.status(201).json({isError:false,message:"Party Information updated successfully"});
  },

  deleteParty:async(req,res)=>{
    await Party.findOneAndDelete({name:req.body.name});
    return res
    .status(200)
    .json({ isError: false, message: req.body.name+" party deleted successfully" });
  }
};
