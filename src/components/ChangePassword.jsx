import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../AuthContext'

const ChangePassword = () => {
    const authData = useContext(Authcontext);
    const navigate = useNavigate()
    const [updatePassword,setUpDatePassword] = useState({
        existingPassword : "",
        newPassword : "",
        confirmPassword : ""
    })
    const initialError = {
        existingPasswordError : "",
        newPasswordError : "",
        confirmPasswordError : ""
    }
    const [error,setError] = useState({
        existingPasswordError : "",
        newPasswordError : "",
        confirmPasswordError : ""
    })
    function isPasswordConPasswordMatching(){
        let newPasswordArray = updatePassword.newPassword.split("");
        let conPasswordArray = updatePassword.confirmPassword.split("");
        if(newPasswordArray.length !== conPasswordArray.length){
            setError({...error,confirmPasswordError : "confirm password does not match"})
        }
        for(let i =0; i<newPasswordArray.length; i++){
            if(newPasswordArray[i]!==conPasswordArray[i]){
                setError({...error,confirmPasswordError : "confirm password does not match"})
                return false;
            }
        }
        return true;
    }
    function basicPasswordHandler(){
        if(updatePassword.existingPassword === ""){
            setError({...error,existingPasswordError:"please provide current password"})
        }
        else if(updatePassword.newPassword === ""){
            setError({...error,newPasswordError : "please provide new password"})
        }
        else if(updatePassword.confirmPassword === ""){
            setError({...error,confirmPasswordError:"please confirm the password"})
        }
        else if(!isPasswordConPasswordMatching()){

        }
        else{
            let getLocalStorageArray = JSON.parse(localStorage.getItem('info'));
            console.log(updatePassword.existingPassword);
            console.log(getLocalStorageArray);
            let isPasswordAvailable = getLocalStorageArray.find((el)=>{
                return el.password === updatePassword.existingPassword
            })
            console.log(isPasswordAvailable);
            if(isPasswordAvailable === undefined){
                setError({...error,existingPasswordError : "Existing password is incorrect"})
            }
            else{
                
                if(isPasswordAvailable.username === authData.userInfo.username){
                    setError({...initialError})
                    return true
                }
                else{
                    setError({...error,existingPasswordError : "existing password is incorrect"})
                }
            }
        }
    }
    function handler(e){
        e.preventDefault();
        if(basicPasswordHandler()){
            let localPasswordArray = JSON.parse(localStorage.getItem('info'));
            localPasswordArray = localPasswordArray.map((el)=>{
                if(el.password === updatePassword.existingPassword){
                     el.password = updatePassword.newPassword
                }
                return el;
            })
            localStorage.setItem('info',JSON.stringify(localPasswordArray));
            navigate('/');
        }

    }

  return (
    <>
    <form onSubmit={(e)=>handler(e)}>
        <label htmlFor='existingPassword'><h4>Current Password</h4></label>
        <input type='text' id='existingPassword' onChange={(e)=>setUpDatePassword({...updatePassword,existingPassword:e.target.value})}></input>
        <br/>
        <div className='error'>{error.existingPasswordError}</div>
        <br/>
        <label htmlFor='newPassword'><h4>New password</h4></label>
        <input type='text' id='newPassword' onChange={(e)=>setUpDatePassword({...updatePassword,newPassword:e.target.value})}></input>
        <br/>
        <div className='error'>{error.newPasswordError}</div>
        <br/>
        <label htmlFor='confirmPassword'><h4>Confirm password</h4></label>
        <input type='text' id='confirmPassword' onChange={(e)=>setUpDatePassword({...updatePassword,confirmPassword:e.target.value})}></input>
        <br/>
        <div className='error'>{error.confirmPasswordError}</div>
        <br/>
        <button>submit</button>
    </form>
    </>
  )
}

export default ChangePassword
