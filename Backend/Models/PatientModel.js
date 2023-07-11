const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Test",
         },
    ],
    discription:{
        type: String,
        required:true,
        maxLength:50,
        trim:true
    }
},{timestamps:true})

module.exports = mongoose.model('Patient',PatientSchema)