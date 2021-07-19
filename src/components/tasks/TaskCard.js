import React, { useContext } from 'react'
import { TaskContext } from './TaskProvider'
import './Task.css'

export const TaskCard = ({ task }) => {
  const { deleteTask } = useContext(TaskContext)

  const handleDeleteTask = () => {
    deleteTask(task.id)
  }

  return (
    <>
      <section className="task">
        <h3 className="task__name">{task.name}</h3>
        <div className="task__date">{task.completionDate}</div>
        <fieldset>
        <input type="checkbox" name="complete__task" id={`task__${task.id}`}></input>
          <label className="check__label" htmlFor={`task__${task.id}`}>Task Complete</label>
        </fieldset>
        <button className="btn btn-primary" onClick={()=>{handleDeleteTask()}}>Delete Task</button>
      </section>
    </>
  )
}