const express = require("express");
const router =  express.Router()
const {registrerUser,loginUser,datosUser } = require("../controllers/usersController")
const {protect} = require('../middleware/authMiddleware')

router.post("/", registrerUser)
router.post("/login",loginUser)
router.get("/data",protect, datosUser)


module.exports = router 