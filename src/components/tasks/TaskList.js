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
      <h1>Tasks</h1>
      <div className="tasks">

      <button className="btn btn-primary add-task" onClick={() => history.push("/tasks/create")}>
        Add New Task
      </button>
        {
          tasks.map(task => {
            return <TaskCard key={task.id} task={task} />
          })
        }
      </div>
    </>
  )
}