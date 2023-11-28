const asyncHandler = require("express-async-handler");
const Tarea = require("../models/tareaModel")

const getTareas = asyncHandler (async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})

const createTarea = asyncHandler (async (req, res) => {
    if(!req.body.texto){
        res.status(400)
        throw new Error ("No escribiste una descripción") // esto es lo que sale con el err.message del error Middleware
    }
    const tarea = await Tarea.create({
        texto: req.body.texto
    })
    res.status(201).json(tarea)
})

const updateTarea = asyncHandler (async (req, res) => {
    res.status(201).json({message: `Se modifico la tarea ${req.params.id}`})
})
const deleteTarea =  asyncHandler (async (req, res) => {
    res.status(200).json({message:`Se eliminó la tarea ${req.params.id}`})
   
})

module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea

}