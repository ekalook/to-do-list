import React, {useEffect, useState} from 'react';
import './App.css';
import { RxCheck } from "react-icons/rx"
import { FiTrash } from "react-icons/fi"


function App() {
  const[isCompleteTask, setIsComplateTask] = useState(false)
  const[allTodos, setTodos] = useState([])
  const[newTitle, setNewTitle] = useState("")
  const[completedTodo, setCompletedTodo] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
    title:newTitle,
}
  

    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newTodoItem)
    setTodos(updatedTodoArr)
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index, 1)

    localStorage.setItem ('todolist', JSON.stringify(reducedTodo))
    setTodos (reducedTodo)
    
 }

 const handleComplete = (index) => {
  let now = new Date ()
  let dd = now.getDate()
  let mm = now.getMonth() + 1
  let yyyy = now.getFullYear()
  let h = now.getHours()
  let m = now.getMinutes()
  let s = now.getSeconds()
  let complatedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':'+m+':' + s;
  let filteredItem = {
    ...allTodos[index],
    complatedOn:complatedOn
  }

  let updatedCompletedArr = [...completedTodo]
  updatedCompletedArr.push(filteredItem)
  setCompletedTodo(updatedCompletedArr)
  handleDeleteTodo(index)
  localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))
 }

 const handleDeleteCompleteTodo = (index) => {
    let reducedTodo = [...completedTodo]
    reducedTodo.splice(index, 1)

    localStorage.setItem ('completedTodo', JSON.stringify(reducedTodo))
    setCompletedTodo (reducedTodo)

 }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'))

    if(savedTodo) {
      setTodos(savedTodo)
    }

    if(savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo)
    }
  },[])

  return (
    <>
    <div className="App">
    <h1>My TODO LIST</h1> 

     <div className='todo-wrap'>

      <div className='todo-input'>

        <div className='todo-input-item'>
          <label>Title</label>
          <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's your task?" />
        </div>

        
        <div className='todo-input-item'>
          <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
        </div> 

      </div>

    <div className='btn-area'>
      <button 
      className={`secondaryBtn isCompleteTask ${isCompleteTask===false && 'active'}`}
      onClick={()=> setIsComplateTask(false)}
      >Todo
      </button>
      
      <button className={`secondaryBtn isCompleteTask ${isCompleteTask===true && 'active'}`} 
      onClick={()=> setIsComplateTask(true)}
      >Completed
      </button>

    </div>

    <div className='todo-list'>

    {isCompleteTask === false && allTodos.map((item, index) => {
      return( <
      div className='todo-list-item' key={index}>
      <div>
        <h3>{item.title}</h3>
       </div>

       <div>
       <FiTrash className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
       <RxCheck className='check-icon' onClick={() => handleComplete(index)} title='Complete'/>
       </div>
       </div>)
    })}

    {isCompleteTask === true && completedTodo.map((item, index) => {
      return( 
      <div className='todo-list-item' key={index}>
      <div>
        <h3>{item.title}</h3>
        <p><small>Completed on: {item.complatedOn}</small></p>
       </div>

       <div>
       <FiTrash className='icon' onClick={() => handleDeleteCompleteTodo(index)} title='Delete' />
       </div>
       </div> 
       );
    })}
     
     
      </div>
     </div>
    </div>
    </>
  );
}

export default App;
