const express = require('express')
const {addPatient,addTest, getPatient, getTest} = require('../controllers/patientController')

const router = express.Router() 

router.post('/', addPatient)
router.get('/:firstName/:lastName',getPatient)
router.post('/add-test/:id/:category/:date', addTest)
router.get('/get-test/:id/:category',getTest)
module.exports = router