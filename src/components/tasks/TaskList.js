import React, { useContext, useEffect } from 'react'
import { TaskContext } from './TaskProvider'
import { TaskCard } from './TaskCard'
import "./Task.css"

export const TaskList = () => {

  const { getTasks, tasks } = useContext(TaskContext)
  
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <h1>Tasks</h1>
      <div className="tasks">
        {
          tasks.map(task => {
            return <TaskCard key={task.id} task={task} />
          })
        }
      </div>
    </>
  )
}