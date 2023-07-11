
const Patient = require("../Models/PatientModel")
const Test = require("../Models/TestModel")
const parser = require("body-parser")

exports.addPatient = async (req,res) => {
    const {firstName,lastName,tests , discription  } = req.body

    const patient = Patient({
        firstName,
        lastName,
        tests,
        discription,
    })
    //vaildation
    try{
        if(!firstName  || !lastName || !discription || !tests)
        {
            res.status(400).json({message: "All Fields are required"})
        }
        await patient.save()
        res.status(200).json({message:"Patient Added"})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
    console.log(patient)
}

exports.addTest = async (req, res) => {
    const { id, category, date} = req.params

    if (!id ||  !category || !date) {
        console.log("Proper param not sent with request")
        return res.sendStatus(400)
    }

    const testDetails = {
        patientId: id,
        testname: category,
        date: date,
    };

    try {
        // Create a new test
        const test = new Test(testDetails);
        await test.save();

        // Find the patient
        const patient = await Patient.findById(id);

        // add test to patient
        patient.tests.push(test);
        await patient.save();

        res.status(200).json({message:"Test Added Succesfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }

}

exports.getPatient = async (req, res) => {
    console.log(req.params);
    const { firstName, lastName } = req.params
    
    console.log("last: ",lastName)
    try {
    const patients = await Patient.find({
      firstName: firstName,
      lastName: lastName
    }).sort({ createdAt: -1 });

    if (patients.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getTest = async (req, res) => {
    console.log("para",req.params);
    const { id,category } = req.params
    try{
        const tests = await Test.find({ patientId: id , testname: category}).sort({date:-1})
        res.status(200).json(tests)
        console.log("Test log", tests);
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}