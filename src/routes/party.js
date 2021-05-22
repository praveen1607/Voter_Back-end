"use strict";

const router = require("express").Router();

const {createParty,getAllParties,updateParty,deleteParty}=require("../controllers/party");

router.post("/create",createParty);

router.get("/getAll",getAllParties);

router.post("/update/:partyID",updateParty);

router.post("/delete",deleteParty);

module.exports=router;