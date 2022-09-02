import React, { createContext, useState } from 'react'
export const Authcontext = createContext();
const AuthContext = (props) => {
    const [userInfo,setUserInfo] =useState({
      username : ""
    });
    
  return (
    <Authcontext.Provider value={{userInfo,setUserInfo}}>
        {props.children}
    </Authcontext.Provider> 
  )
}

export default AuthContext
