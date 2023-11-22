const express = require("express");
const router = express.Router();
const {getTareas,createTarea,updateTarea,deleteTarea } = require("../controllers/tareasController")

router.get("/", getTareas)
router.post("/",createTarea)
router.put("/:id",updateTarea)
router.delete("/:id",deleteTarea)

module.exports = router