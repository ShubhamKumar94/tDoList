import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileSetting = () => {
    const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate('/profile/profileSetting/updatePhoneNumber')}>Update Phone Number</button>
      <br/>
      <br/>
      <button onClick={()=>navigate('/profile/profileSetting/changePassword')}>Change Password</button>
    </div>
  )
}

export default ProfileSetting
