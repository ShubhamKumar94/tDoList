import React from 'react'

const TodoRendered = (props) => {
  console.log(props);
  return (
    <>
    <li key = {props.index} className = 'todo_style'>
     <div id={props.id} >{props.list}</div>
     <button id={props.id} className = 'todo_button' onClick = {(e)=>props.deletefunction(e)}>Delete</button>
     </li>
    </>
      
    
  )
}

export default TodoRendered
