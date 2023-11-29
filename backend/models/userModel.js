const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "Por favor ingresa tu nombre."]
    },
    email: {
        type:String,
        required: [true, "Por favor ingresa tu email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Por favor ingresa tu password."]
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true 
})

module.exports = mongoose.model("User", userSchema)