import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
const [number,setNumber] = useState({
    phonenumber : ""
})
const initialError = {
  phoneNumberError : ""
}
const [error,setError] = useState({
  phoneNumberError : ""
})
function phoneNumberHandler(){
    if(number.phonenumber === ""){
      setError({phoneNumberError : "Please provide phone number"})
    }
    else if (number.phonenumber.length !== 10){
      setError({phoneNumberError : "Please provide valid phone number"})
    }
    else{
      setError({initialError});
      return true;
    }
}
const [userPassword,setPassword] = useState({password : ""})
const [navigateTo, setNavigateTo] = useState(false);
const [stringData,setStringData] = useState(false);
function handler(e){
    e.preventDefault();
    if(phoneNumberHandler()){
       let getPhoneDataArray = JSON.parse(localStorage.getItem('info'));
       let getPhoneData = getPhoneDataArray.find((el)=>{
          return el.phonenumber === number.phonenumber
       })
       if(getPhoneData === undefined){
        setError({phoneNumberError : "Please check the number"})
       }
       else{

        setError({initialError});
        setPassword({password :getPhoneData.password})
        setStringData(true);
        console.log(userPassword.password);
        setNavigateTo(true);
       }
    }
    


}
  return (
    <>
      <form onSubmit={(e)=>handler(e)}>
      <label htmlFor='phoneNumber'><h4>Please enter registered phone number</h4></label>
      <br/>
      <br/>
      <input type='text' id='phoneNumber' onChange={(e)=>setNumber({phonenumber : e.target.value})}></input>
      <div className='error'>{error.phoneNumberError}</div>
      <br/>
      <br/>
      <button>submit</button>
      </form>
      {stringData && <div><h4>Your password is</h4></div>}
      <div>{userPassword.password}</div>
      {navigateTo && <button onClick={()=>navigate("/login")}>login</button>}
    </>
  )
}

export default ForgotPassword 
