import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { Authcontext } from '../AuthContext'

const RequireLogin = (props) => {
    let authData = useContext(Authcontext);
    let location = useLocation()
    console.log(location);
    console.log(authData);
    if(authData.userInfo.username === ""){
        return(
            <>
            <Navigate to='/login' state={{path : location.pathname}}></Navigate>
            </>
        )
    }
    else{
        return(
            <>
            {props.children}
            </>
        )
    }
  
}

export default RequireLogin
