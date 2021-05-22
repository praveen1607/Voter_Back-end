"use strict";

const router = require("express").Router();

const {getAllVoters}=require("../controllers/voter");


router.get("/getAll",getAllVoters);


module.exports=router;

