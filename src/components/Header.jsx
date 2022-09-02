import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { Authcontext } from '../AuthContext'
const Header = () => {
  let authData = useContext(Authcontext);
  console.log(authData);
  return (
    
    <>
      <div className='list'>
      <ul className='list-item'>
        
        <li>
          <NavLink to='/'>Home</NavLink>
            {/* <a href='/'>Home</a> */}
        </li>
        <li>
            <NavLink to='/toDoList'>ToDo_List</NavLink>
            {/* <a href='/about'>about</a> */}
        </li>
        <li>
            <NavLink to='/profile'>Profile</NavLink>
            {/* <a href='/profile'>Profile</a> */}
        </li>
        
        {authData.userInfo.username ? <div><h3>Welcome {authData.userInfo.username}</h3></div>:<li>
            <NavLink to='/login'>Login</NavLink>
            {/* <a href='login'>Login</a> */}
        </li>}
        
      </ul>
      </div>
    </>
  )
}

export default Header
