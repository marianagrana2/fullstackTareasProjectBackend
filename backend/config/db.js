const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected ${conn.connection.host}`.cyan.underline)
    }catch (error){
        console.log(error)
        process.exit(1) //Detener el proceso de conexión a la base de datos
    }
}
module.exports = connectDB

