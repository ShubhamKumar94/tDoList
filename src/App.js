
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import Profile from './components/Profile';
import AuthContext from './AuthContext';
import { useEffect } from 'react';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UpdatePhoneNumber from './components/UpdatePhoneNumber';
import ChangePassword from './components/ChangePassword';
import ProfileSetting from './components/ProfileSetting';
import RequireLogin from './components/RequireLogin';
import TodoInput from './components/TodoInput';

function App() {
  useEffect(()=>{
    localStorage.setItem('info', JSON.stringify([]))
    return () => {
       window.localStorage.clear()
     }
  },[])
  return (
    <>
    <AuthContext>
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/toDoList' element={<RequireLogin><TodoInput/></RequireLogin>}/>
        <Route path='/profile'element={<RequireLogin><Profile/></RequireLogin>}/> 
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path='/profile/profileSetting/updatePhoneNumber' element ={<RequireLogin><UpdatePhoneNumber/></RequireLogin>}/>
        <Route path='/profile/profileSetting/changePassword' element ={<RequireLogin><ChangePassword/></RequireLogin>}/>
        <Route path='/profile/profileSetting' element = {<ProfileSetting/>}/>
      </Routes>
      
    </div>
    </AuthContext>
    </>
  );
}

export default App;
