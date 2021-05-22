"use strict";

const router = require("express").Router();

const {createElection,findElectionByLocation,findUpComingElections,findUpComingElectionsForContesting,getAllElections,deleteElection,deleteAllElections}=require("../controllers/election");

router.post("/create",createElection);

router.post("/find",findElectionByLocation)

router.post("/find/upcoming",findUpComingElections);

router.post("/find/upcoming/contest",findUpComingElectionsForContesting);

router.get("/view/all",getAllElections);

router.post("/delete",deleteElection);

router.get("/delete/all",deleteAllElections);

module.exports=router;