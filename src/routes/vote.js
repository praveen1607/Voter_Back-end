"use strict";

const router = require("express").Router();

// const { deleteAllNominees } = require("../controllers/admin");
const {castVote,checkStatus,getListOfCandidates,getAllVotes,getStats,deleteAllVotes}=require("../controllers/vote");

router.post("/cast",castVote);

router.post("/checkStatus",checkStatus);

router.post("/getAll/candidates",getListOfCandidates);

router.get("/getAll/votes",getAllVotes);

router.post("/getStats",getStats);

router.get("/deleteAll/votes",deleteAllVotes);

module.exports=router;