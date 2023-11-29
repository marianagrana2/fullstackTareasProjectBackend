const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Register User
const registrerUser = asyncHandler (async(req,res) => {
  const {name, email, password } = req.body
  if(!name || !email || !password){
    res.status(400)
    throw new Error("Faltan datos, favor de verificar")
  }
   
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("Ese usuario ya existe en la base de datos.")
  } else {
    // hash password
  }

  res.status(201).json({message: "Usuario creado"})
})

// Login User
const loginUser = asyncHandler (async (req,res) => {
    res.status(201).json({message: "Login Usuario"}) })

// Datos User
const datosUser = asyncHandler ( async (req,res) => {
    res.status(201).json({message: "Mis datos de Usuario "})
})

module.exports = {
    registrerUser,
    loginUser,
    datosUser 

}