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
  // Verificar si el usuario existe
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("Ese usuario ya existe en la base de datos.")
  } else {
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Crear el user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    //Checamos si se pudo crear el user
    if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.esAdmin
      })
    } else {
      res.status(400)
      throw new Error("No se pudo guardar el usuario.")
    }

  }

  res.status(201).json({message: "Usuario creado"})
})

// Login User
const loginUser = asyncHandler (async (req,res) => {
    // 0. Obtener email y password del usuario
    const {email, password} = req.body
    if(!email || !password){
      res.status(400)
      throw new Error("Faltan datos, favor de verificar")
    }
    // 1. Verificar si ese usuario existe
    const user = await User.findOne({email})
    // Si el usuario y el password con el hash guardados y los que pone el usuario son iguales 
    if(user && (await bcrypt.compare(password, user.password))){
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.esAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error("Credenciales incorrectas, favor de verificar.")
    }
})
// Mostrar Datos de User logeado
const datosUser = asyncHandler ( async (req,res) => {
    res.status(200).json(req.user)
})

//Generar el JWT 
const generateToken = (idUser) => {
  return jwt.sign({idUser},process.env.JWT_SECRET,{
    expiresIn:'30d' // 30 días de expiración
  })
   
}


module.exports = {
    registrerUser,
    loginUser,
    datosUser 

}