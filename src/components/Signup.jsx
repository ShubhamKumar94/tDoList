import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    let authData = useContext(Authcontext);
    const data = {
        username : "",
        password : "",
        phonenumber : "",
        
    }
    const [confirmPasswordData,setConfirmPasswordData] = useState({
        confirmpassword : ""
    })
    const initialError = {
        usernameError : "",
        passwordError : "",
        phonenumberError : "",
        confirmPasswordError : ""
    }
    const [error,setError] = useState({
        usernameError : "",
        passwordError : "",
        phonenumberError : "",
        confirmPasswordError : ""
    })
    const [SignUpData,setSignUpData] = useState(data);
    function userNameErrorValidator(){
        if(SignUpData.username === ""){
            setError({...error, usernameError : "username cannot be empty"})
            return false;
        }
        if (!isUserExist()){

        }
        else{
            setError({...initialError});
            return true;
        }
    }
    function phoneNumberHandler(){
        let phoneNumberData = JSON.parse(localStorage.getItem('info'));
        console.log("phoneNumberData");
        console.log(phoneNumberData);
        let isPhoneNumberPresent = phoneNumberData.find((el)=>{
            return el.phonenumber === SignUpData.phonenumber;
        })
        if(isPhoneNumberPresent === undefined){
            return true;
        }
        else{
            setError({...error,phonenumberError:"Phone number already exist"})
            return false;
        }
    }
    function phoneNumberErrorValidator(){
        if(SignUpData.phonenumber === ""){
            setError({...error,phonenumberError : "phone Number required"})
        }
        else if (SignUpData.phonenumber.length!=10){
            setError({...error,phonenumberError : "please provide valid phone number"})
        }
        else if(!phoneNumberHandler()){
            return false;
        }
        else{
            
            setError({...initialError});
            return true;
        }
    }
    function passwordErrorValidator(){
        if(SignUpData.password === ""){
            setError({...error,passwordError : "Please provide password"})
        }
        let array = SignUpData.password.toUpperCase().split("");
        console.log(array);
        let alpha = array.find((el)=>{
            switch (el){
                case "A":
                    return el;
                case "B":
                    return el;
                case "C":
                    return el;
                case "D":
                    return el;  
                case "E":
                    return el;
                    case "F":
                        return el;
                        case "G":
                    return el;
                    case "H":
                        
                    return el;
                    case "I":
                    return el;
                    case "J":
                    return el;
                    case "K":
                    return el;
                    case "L":
                    return el;
                    case "M":
                    return el;
                    case "N":
                    return el;
                    case "O":
                    return el;
                    case "P":
                    return el;
                    case "Q":
                    return el;
                    case "R":
                    return el;
                    case "S":
                        return el === "S"
                    case "T":
                    return el;
                    case "U":
                    return el;
                    case "V":
                    return el;
                    case "W":
                    return el;
                    case "X":
                    return el; 
                    case "Y":
                    return el;
                    case "Z":
                    return el;
                     default : 
                     return;
                                 

            }
            
        })
        
            if(!alpha){
                setError({...error,passwordError:"Please provide alphaNumeric value"})
                return false;
            }
            let numeric = array.find((el)=>{
                switch (el){
                    case "0":
                        return el;
                        case "1":
                        return el;
                        case "2":
                        return el;
                        case "3":
                        return el;
                        case "4":
                        return el;
                        case "5":
                        return el;
                        case "6":
                        return el;
                        case "7":
                        return el;
                        case "8":
                        return el;
                        case "9":
                        return el;
                        default:
                            return;
                }

            }
            
            )
            if(numeric === undefined){
                setError({...error,passwordError:"password should be alphanumeric"})
            }
            else{
                setError({...initialError});
                return true;
            }
    }
    function confirmPasswordErrorValidator(){
        let passwordArray = SignUpData.password.split("");
        let confirmPasswordArray = confirmPasswordData.confirmpassword.split("");
        if(passwordArray.length !== confirmPasswordArray.length){
            setError({...error,confirmPasswordError:"password does not match"})
            return false
        }
        for(let i =0; i<passwordArray.length; i++){
            if(passwordArray[i] !== confirmPasswordArray[i]){
               setError({...error,confirmPasswordError:"password does not match"})
               return false;
            }

        }
        setError({...initialError});
        return true;
    }
    function isUserExist(){
        let forUserData = JSON.parse(localStorage.getItem('info'));
        let userFromStorage = forUserData.find((el)=>{
            return SignUpData.username === el.username;

        })
        if(userFromStorage === undefined){
            return true;
        }
        else{
            setError({...error,usernameError:"username already exist"})
            return false;
        }
    }
    function userNameHandler(e){
        setSignUpData({...SignUpData,username : e.target.value});
        isUserExist();
    }
    function handler(e){
        e.preventDefault();
        
        if(userNameErrorValidator()){
            
            if(phoneNumberErrorValidator()){
                
                if(passwordErrorValidator()){
                    
                   if(confirmPasswordErrorValidator()){
                    let localStorageArray = JSON.parse(localStorage.getItem('info'))
                    //console.log(SignUpData);
                     localStorageArray.push(SignUpData);
                    //console.log(localStorageArray);
                    localStorage.setItem('info',JSON.stringify(localStorageArray));
                    authData.setUserInfo({username : SignUpData.username});
                    localStorage.setItem(SignUpData.username , JSON.stringify([]) );
                    navigate('/toDoList');
                   }
                }
            }

        };
        
    }


  return (
    <>
      <form onSubmit={(e)=>handler(e)}>
        <label htmlFor='username'><h4>UserName</h4></label>
        <input type='text' id='username' onChange={(e)=>userNameHandler(e)}></input>
        <div className='error'>{error.usernameError}</div>
        <br/>
        <br/>
        <label htmlFor='number'><h4>Phone Number</h4></label>
        <input type='number' id='number'onChange={(e)=>setSignUpData({...SignUpData,phonenumber : e.target.value})}/>
        <div className='error'>{error.phonenumberError}</div>
        <br/>
        <br/>
        <label htmlFor='password' ><h4>Password</h4></label>
        <input type='password' id='password'onChange={(e)=>setSignUpData({...SignUpData,password : e.target.value})}/>
        <div className='error'>{error.passwordError}</div>
        <br/>
        <br/>
        <label htmlFor='confirmPassword'><h4>ConfirmPassword</h4></label>
        <input type='password' id='confirmPasword' onChange={(e)=>setConfirmPasswordData({...confirmPasswordData,confirmpassword: e.target.value})}/>
        <div className='error'>{error.confirmPasswordError}</div>
        <br/>
        <br/>
        <button>SignUp</button>
      </form>
      
    </>
  )
}

export default Signup
