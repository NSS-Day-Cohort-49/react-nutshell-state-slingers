//Kipp Minton
//Component for rendering task form; currently only creates and saves new tasks

import React, { useContext, useState, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';


export const TaskForm = () => {
  const { addTask, editTask, getTaskById } = useContext(TaskContext)

  const [task, setTask] = useState({
    name: "",
    userId: 0,
    deadline: "",
    isCompleted: false,
    completeDate: 0
  });

  const history = useHistory()
  const { taskId } = useParams()

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId)
      .then(task =>{
        setTask(task)
      })
    }
  }, [])

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newTask = { ...task }

    newTask[event.target.id] = event.target.value
    // update state
    setTask(newTask)
  }

  const saveNewTask = () => {
    const userId = parseInt(sessionStorage.nutshell_user)
    const newTask = {
      name: task.name,
      userId: userId,
      deadline: task.deadline,
      isCompleted: task.isCompleted,
      completeDate: task.completeDate
    }
    addTask(newTask)
      .then(() => history.push("/tasks"))
  }

  const saveEditTask = () => {
    editTask({
      id: task.id,
      name: task.name,
      userId: task.userId,
      deadline: task.deadline,
      isCompleted: task.isCompleted,
      completeDate: task.completeDate
    })
    .then(() => history.push("/tasks"))
  }


  const handleSaveTask = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    if (task.name === "" || task.deadline === "") {
      window.alert("Please complete all forms")
    } else if (taskId){
      saveEditTask()
    } else {
      saveNewTask()
    }
  }

  return (
    <>
      <form className="taskForm">
        <h2 className="taskForm__title">New Task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Task Name:</label>
            <input type="text" id="name" required="required" autoFocus className="form-control" placeholder="task name" value={task.name} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="deadline">Complete by Date:</label>
            <input type="date" id="deadline" required="required" className="form-control" value={task.deadline} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleSaveTask}>
          Save Task
        </button>
      </form>
    </>
  )
}
