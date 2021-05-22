"use strict";

const router = require("express").Router();

const {createUser,viewUser,loginUser,updateUser,deleteUser,viewAllUsers,deleteAllUsers}=require("../controllers/universal");

router.post("/:userRole/create",createUser);

router.post("/view",viewUser);

router.post("/update",updateUser);

router.post("/login",loginUser);

router.post("/delete",deleteUser);

router.get("/view/all",viewAllUsers);

router.get("/delete/all",deleteAllUsers);

module.exports=router;