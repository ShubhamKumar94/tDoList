import React, { useContext } from 'react'
import { Authcontext } from '../AuthContext'
import {NavLink,Link,useNavigate} from 'react-router-dom'

const Home = () => {
  const context = useContext(Authcontext)
  const navigate = useNavigate()
  return (
    <>
    <div className='home'></div>
      <div className="bg-text">
      <h1>Get More Done: Try These 10 Simple Tips for Better To-Do Lists </h1>
      <ul className='homeContent'>
        <li>Write Down Your Tasks as Soon as You Think of Them</li>
        <li>Revise Your To-Do Lists Daily</li>
        <li> Limit Yourself to 3–5 Tasks per Day</li>
        <li>Put Tasks on Your To-Do List, Not Goals</li>
        <li>Keep Goals and Objectives Separate</li>
        <li>Look at Your To-Do List Often</li>
        <li>Make Your To-Do List Scannable</li>
      </ul>
      <h4>Watch the video</h4>
      <a className='homeContent' href='https://www.youtube.com/watch?v=TkapwZM6cJI' target="_blank">How To Organize Your To-Do Lists</a>
      <br/>
      <br/>
      <button onClick={()=>navigate('/login')}>login</button>
    </div>
    </>
  )
}

export default Home
