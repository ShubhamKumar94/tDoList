import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const UpdatePhoneNumber = () => {
    const navigate =useNavigate()
    const [phoneNumber,setPhoneNumber] = useState({
        existingPhoneNumber :"",
        updatedPhoneNumber : ""
    })
    const initialState = {
        existingPhoneError : "",
        updatedPhoneError : ""
    }
    const [error,setError] = useState({
        existingPhoneError : "",
        updatedPhoneError : ""
    })
    function isPhoneNumberRegistered(){
        let localArray = JSON.parse(localStorage.getItem('info'));
            let localData = localArray.find((el)=>{
                return el.phonenumber === phoneNumber.existingPhoneNumber
            })
            if(localData===undefined){
                setError({...error,existingPhoneError : "Please provide registered phone number"})
            }
            else{
                setError({...initialState});
                return true;
            }
            
    }
    function basicPhoneNumberHandler(){
        if(phoneNumber.existingPhoneNumber === ""){
            setError({...error,existingPhoneError : "Please provide existing phone number"})
        }
        else if(phoneNumber.existingPhoneNumber.length !== 10){
            setError({...error,existingPhoneError: "Please provide valid phone number"})
        }
        else if(phoneNumber.updatedPhoneNumber === ""){
            setError({...error,updatedPhoneError : "Please provide updated phone number"})
        }
        else if(phoneNumber.updatedPhoneNumber.length !== 10){
            setError({...error,updatedPhoneError: "Please provide valid phone number"})
        }
        else if(!isPhoneNumberRegistered()){

        }
        else{
            setError({...initialState})
            return true;
        }
    }
    function handler(e){
       e.preventDefault();
       if(basicPhoneNumberHandler()){
           let localStorageArray = JSON.parse(localStorage.getItem('info'));
           localStorageArray = localStorageArray.map((el)=>{
               if(el.phonenumber === phoneNumber.existingPhoneNumber ){
                  el.phonenumber = phoneNumber.updatedPhoneNumber
               }
               return el;
           })
           console.log(localStorageArray);
           localStorage.setItem('info',JSON.stringify(localStorageArray))
           navigate('/');
       }

    }
  return (
    <>
      <form onSubmit={(e)=>handler(e)}> 
      <label htmlFor='oldNumber'><h4>Please provide existing phone number</h4></label>
      <input type="number" id='oldNumber' onChange={(e)=>setPhoneNumber({...phoneNumber,existingPhoneNumber:e.target.value})}/>
      
      <br/>
      <div className='error'>{error.existingPhoneError}</div> 
      <br/>
      <label htmlFor='newNumber'><h4>Please provide new phone number</h4></label>
      <input type="number" id='newNumber' onChange={(e)=>setPhoneNumber({...phoneNumber,updatedPhoneNumber:e.target.value})}/> 
      <br/>
      <div className='error'>{error.updatedPhoneError}</div> 
      <br/>
      <button>Submit</button>
      </form>
    </>
  )
}

export default UpdatePhoneNumber
