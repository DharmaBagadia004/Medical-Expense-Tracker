import React, { useState } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import './home.css'
import { dateFormat } from '../../utils/dateFormat';
import { useToast } from '@chakra-ui/react'


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'


const Home = () => {
    const toast = useToast()
    const { getPatient,tests,addTest } = useGlobalContext()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [inputState, setInputState] = useState({
        firstName: '',
        lastName: '',
        category: '',
        date:''
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const {firstName,lastName,category,date} = inputState

    const handleInput = name => e => {
        setInputState({...inputState,[name]: e.target.value})
    }

    const handleSubmit = function(e){
        console.log("Submit handle called")

        addTest(inputState)
        setInputState({
            firstName: '',
            lastName: '',
            category: '',
            date:''
        })
        toast({
          title: 'Test Added',
          description: "Your Test has been added suceesfully",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsButtonDisabled(true)
    }

    const modalfunc = function (e) {
        console.log('Modal func called')
        e.preventDefault()
        if (!firstName || !lastName || !category || !date) {
            toast({
                title: `Enter all Details`,
                status: 'error',
                isClosable: true,
            })
        }
        else {
            getPatient(inputState)
            onOpen()
        }
    }

    return (
      
    <div className='home'>
        <form method="POST" onSubmit={handleSubmit}>
              <div className="input-control">
                <div>FirstName:</div>  
                <input 
                    type="text" 
                    value={firstName}
                    name={'firstName'}
                    placeholder="Enter Your First Name"
                      onChange={handleInput('firstName')}
                />
              </div>
              <div className="input-control">
                <div>LastName:</div>
                <input 
                    type="text" 
                    value={lastName}
                    name={'lastName'}
                    placeholder="Enter Your last Name"
                      onChange={handleInput('lastName')}
                      
                />
              </div>
              <div className="selects input-control">
                  <div>Test Type:</div>
                    <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                        <option value="" disabled >Select Option</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="X-Ray">X-Ray</option> 
                    </select>
              </div>
              <div className="input-control">
                  <div>Date:</div>
                <DatePicker
                    id = 'date'
                    placeholderText = "Enter Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) =>
                    {
                        setInputState({...inputState, date: date})
                      }} 
                    required  
                />
            </div>
              {/* <button type = 'submit'>Click to submit</button> */}
              {/* {console.log(tests[0].date)} */}
            <>
                    <Button onClick={modalfunc}>Save</Button>
                    {/* {firstName||lastName||category||date ?  */}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                          
                          <ModalHeader>{category}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                              {tests.length>0 ? tests?.map((test) => {
                            const {_id,date} = test
                                return <h5>{dateFormat(date)}</h5>
                              }) :
                                  <h5>No {category} Done till now</h5>
                    
                    }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                              <Button variant='ghost' onClick={handleSubmit} isDisabled={isButtonDisabled}
                              >Continue</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal> 
                
            </>
            
        </form >  
    </div>
  )
}

export default Home