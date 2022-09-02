import React, { useContext, useEffect, useRef, useState } from 'react'
import { Authcontext } from '../AuthContext';
import TodoRendered from './TodoRendered';

const TodoInput = () => {
    let authData = useContext(Authcontext);
    const inputRef = useRef();
    const [toDoInput,setToDoInput] = useState("");
    //const [count , setCount] = useState(0);
    const initialError = {
      errorDisplay : ""
    }
    const [error,setError] = useState({
      errorDisplay : ""
    })
    const [dataArray,setDataArray] = useState([]);
    const [allow,setAllow] = useState(false);
    function errorHandler(){
      console.log("toDoInput");
      if(toDoInput === ""){
        console.log("galat");
        setError({errorDisplay : "Please assign the task"})
        return false;
      }

      let duplicateData = dataArray.find((el)=>{
        return el.list == toDoInput
      })
      if(duplicateData){
        setError({errorDisplay : "This task is already assigned"})
        return false;
      }
      else{
        setError({...initialError});
        return true;
      }
    }
    function deleteFunction(e){
      console.log(e.target.id);
      console.log(dataArray);
      let  newDataArray = dataArray.filter((el)=>{
           return e.target.id != el.id;
        })
        console.log(dataArray);
        localStorage.setItem(authData.userInfo.username,newDataArray);
        setDataArray([...newDataArray]);
    }
    useEffect(()=>{
      let getToDoDataArray = JSON.parse(localStorage.getItem(authData.userInfo.username));
      if(getToDoDataArray[0] === undefined){
        setDataArray([]);
        return;
      }
      else{
        setDataArray([...getToDoDataArray]);
        return;
      }
    },[authData.userInfo.username])
    function localhandler(){
      
    }
    useEffect(()=>{
      localStorage.setItem(authData.userInfo.username,JSON.stringify(dataArray));
    },[dataArray])
    
    function handler(e){
      e.preventDefault();
      //const upperCase = toDoInput.toUpperCase();
      //setToDoInput(upperCase);
      // setAllow(toDoInput.toUpperCase());
      console.log(toDoInput);
      if(errorHandler()){
      let num =Math.floor( Math.random()*1000000)
      setDataArray([...dataArray,{id : num , list : inputRef.current.value}])
     // setCount(count => count+1);
     
     console.log(dataArray);
      
      
      setAllow(false);
     } 
     setToDoInput("");
    }
  return (
    <>
    <h3>Make your list and achieve it</h3>
    <div className="main_div">
      <div className='center_div'>
    
    <form onSubmit={(e)=>handler(e)}>
        <input type='text' placeholder='Please write here'value={toDoInput} ref = {inputRef} onChange = {(e)=>setToDoInput(e.target.value)}/>
        <button className='addButton'>+</button>
        <div className='error'>{error.errorDisplay}</div>
        <ul>
      {dataArray.map((el,index)=>{
         return(
          
          <TodoRendered index = {index}id = {el.id} list = {el.list} deletefunction = {deleteFunction}/>
         )
      })}
     </ul>
    </form>
    </div>
    </div>
    </>
    
      
    
  )
}

export default TodoInput
