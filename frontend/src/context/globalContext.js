import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/"

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    
    const [tests, setTests] = useState([])
    const [id, setId] = useState()
    const [found,setFound] = useState(false)
    
    const getPatient = async (name) => {
        console.log("hbhb", name);
        const {firstName , lastName,category,date} = name
        //const response = await axios.get(`${BASE_URL}`, name)
        const response = await axios.get(`${BASE_URL}/${firstName}/${lastName}`, {
            
        })
            .catch((err) => {
            console.log(err)
            })
        if (response == null) {
            console.log("Patient Not Found");
            return
        }
        const patient_id = response.data[0]._id
        setId(patient_id)
        console.log(response.data[0]._id)
        console.log(category,date)
        console.log("Patient deatils display")
        setFound(true)
        getTest(patient_id,category)
    }
    const getTest = async (patientId, category) => {
        console.log("hbhb", patientId, category);
       
        const response = await axios.get(`${BASE_URL}/get-test/${patientId}/${category}`)
            .catch((err) => {
            console.log(err)
            })
        setTests(response.data)
        console.log("usestate",tests)
        console.log("Test deatils display")
    }
    const addTest = async (testDetails) => {
        const {category,date} = testDetails
        console.log("inside add Test function", id, category, date)
        
        const response = await axios.post(`${BASE_URL}/add-test/${id}/${category}/${date}`)
            .catch((err) => {
            console.log(err)
            })
        console.log("Test add succesfully", response);
        getTest(id,category)
    }
     return(
        <GlobalContext.Provider value={{
            getPatient,
             tests,
             addTest
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}