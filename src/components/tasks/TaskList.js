//Kipp Minton
//Component displays list of current user's individual task cards

import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TaskContext } from './TaskProvider'
import { TaskCard } from './TaskCard'
import "./Task.css"

export const TaskList = () => {

  const { getTasks, tasks } = useContext(TaskContext)
  const history = useHistory()
  
  useEffect(() => {
    getTasks()
  }, [])


  return (
    <>
      <h1 className="task-header">Tasks</h1>
      <div className="tasks">

      <button className="add-task" onClick={() => history.push("/tasks/create")}>
        Add New Task
      </button>
        {
          tasks.map(task => {
            let taskUser = task.userId
            let sessionUser = parseInt(sessionStorage.getItem("nutshell_user"))
            if(taskUser === sessionUser && task.isCompleted === false){
            return <TaskCard key={task.id} task={task} />
            }
          })
        }
      </div>
    </>
  )
}