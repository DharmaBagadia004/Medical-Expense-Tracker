const mongoose = require('mongoose')

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL
const db = async () =>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(MONGO_URL)
        console.log("DB Connected")
    }
    catch(error){
        console.log(error)
        console.log("DB Connection error")
    }
}

module.exports = { db }

