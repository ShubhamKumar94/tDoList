import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../AuthContext'

const Profile = () => {
  let AuthData = useContext(Authcontext);
  console.log(AuthData);
  let navigate = useNavigate()
  function logOutHandler(){
    AuthData.setUserInfo({username : ""})
    navigate('/login');
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={()=>logOutHandler()}>log out</button>
      <br/>
      <br/>
      <button onClick={()=>navigate('/profile/profileSetting')}>Profile Setting</button>
    </div>
  )
}

export default Profile
