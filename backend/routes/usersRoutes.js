const express = require("express");
const router =  express.Router()
const {registrerUser,loginUser,datosUser } = require("../controllers/usersController")

router.post("/", registrerUser)
router.post("/login",loginUser)
router.get("/data",datosUser)


module.exports = router 