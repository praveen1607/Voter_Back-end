"use strict";

const router = require("express").Router();

const {getAllCandidates,getApprovedCandidates,getCandidatesForApproval,getPartyCandidates}=require("../controllers/candidate");


router.get("/getAll",getAllCandidates);

router.get("/get/approved",getApprovedCandidates);

router.get("/get/new",getCandidatesForApproval);

router.get("/get/party/:partyID",getPartyCandidates);


module.exports=router;

