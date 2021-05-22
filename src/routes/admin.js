"use strict";

const router = require("express").Router();

const { addNominee, getAllNominees, getNomineesForElection,getNomineesForApproval,approveNewNominee,disapproveNominee,deleteNominee, deleteAllNominees } = require("../controllers/admin");

router.post("/add/nominee",addNominee);

router.get("/getAll/nominees",getAllNominees);

router.post("/get/nominees",getNomineesForElection);

router.get("/get/nominees/new",getNomineesForApproval);

router.post("/nominee/approve/:nomineeID",approveNewNominee);

router.post("/nominee/disapprove",disapproveNominee);

router.post("/delete",deleteNominee);

router.get("/deleteAll/nominee",deleteAllNominees);

module.exports=router;