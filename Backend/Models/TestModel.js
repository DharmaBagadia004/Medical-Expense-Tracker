const mongoose = require("mongoose")

const testSchema = mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Patient",
        },
        testname: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required:true,
            trim:true
        },
    }, {
        timestamps: true
    }
)

const Test = mongoose.model("Test", testSchema);

module.exports = Test;