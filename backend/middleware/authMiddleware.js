const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next)=> {

    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Obtenemos el token
            token = req.headers.authorization.split(' ')[1] // Obtener el elemento 1 del array que es el token 
            
            //Verificamos la firma del token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //Obtenemos los datos del usuario para que se queden lo que dure el token
            req.user = await User.findById(decoded.idUser).select('-password')
            next()

        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado.')
        }
    }
    if(!token){
        res.status(401)
            throw new Error('Acceso no autorizado, no se proporcionó ningún token.')
    }
})


module.exports = {
    protect
}