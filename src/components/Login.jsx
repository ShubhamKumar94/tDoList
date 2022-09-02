import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Authcontext } from '../AuthContext';

const Login = () => {
  let authData = useContext(Authcontext)
  console.log(authData);
  let location = useLocation();
  //console.log(location);
  const navigate = useNavigate();
  const [loginUser,setLoginUser] = useState({
    name : "",
    password : ""
  });
  let initialError = {
    nameError : "",
    passwordError : ""
  }
  const [error,setError] = useState(initialError);
  function nameHandler(){
    if(loginUser.name === ""){
      setError({...error,nameError : "Please provide username"})
    }
    else{
      setError({...initialError})
      return true;
    } 
  }
  function passwordHandler(){
    if(loginUser.password === ""){
      setError({...error,passwordError: "Please provide password"})
    }
    else{
      setError({...initialError})
      return true;
    }
  }
  const [navigateTo,setNavigateTo] = useState(false);
  function loginCheck(){
    let getDataArray = JSON.parse(localStorage.getItem('info'))
    let getData = getDataArray.find((el)=>{
      return el.username === loginUser.name
    })
    console.log(getData);
    if(getData === undefined){
      setError({...error,nameError:"username does not exist"})
      return false;
    }
    else if(getData.password !== loginUser.password ){
      setError({...error,passwordError:"password does not match"})
      setNavigateTo(true);
      return false;
    }
    else{
      setError({...initialError})
      return true;
    }
    
  }
  function handler(e){
    e.preventDefault();
      if(nameHandler()){
        if(passwordHandler()){
           if(loginCheck()){
            authData.setUserInfo({username : loginUser.name});
            location.state ? navigate(location.state.path) : navigate('/');
           }
        }
      }
  }

  return (
    <>
      <form onSubmit={(e)=>handler(e)}>
        <label htmlFor='username'><h4>username</h4></label>
        <br/>
        <input type='text' id='username' onChange={(e)=>setLoginUser({...loginUser,name:e.target.value})}></input>
        <div className='error'>{error.nameError}</div>
        <br/>
        <br/>
        <label htmlFor='password'><h4>password</h4></label>
        <br/>
        <input type='password' id='password' onChange={(e)=>setLoginUser({...loginUser,password:e.target.value})}></input>
        <div className='error'>{error.passwordError}</div>
        <br/>
        <br/>
        <button>submit</button>
        
        
      </form>
      
      <br/>
      <br/>
      <button onClick={()=>navigate('/signup')}>sign up</button>
      <br/>
      <br/>
      {navigateTo && <button onClick={()=>navigate('/forgotPassword')}>forgot password</button>}
      

    </>
  )
}

export default Login
