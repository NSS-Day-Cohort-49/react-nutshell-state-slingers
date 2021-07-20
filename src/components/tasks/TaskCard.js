//Kipp Minton
//Component creates individual task item cards based on task object properties saved after TaskForm input.

import React, { useContext } from 'react'
import { TaskContext } from './TaskProvider'
import './Task.css'
import { useHistory } from 'react-router-dom'


export const TaskCard = ({ task }) => {
  const { deleteTask, editTask } = useContext(TaskContext)
  const history = useHistory()

  const handleDeleteTask = () => {
    deleteTask(task.id)
  }

  const handleCompleteTask = (event) => {
    if(!event.target.checked){
      editTask({
        id: task.id,
        name: task.name,
        userId: task.userId,
        deadline: task.deadline,
        isCompleted: false,
        completeDate: 0
      })
    }else{
    editTask({
      id: task.id,
      name: task.name,
      userId: task.userId,
      deadline: task.deadline,
      isCompleted: true,
      completeDate: Date.now()
    })
  }}


  return (
    <>
      <section className="task">
        <h3 className="task__name">{task.name}</h3>
        <div className="task__deadline">{task.deadline}</div>
        <fieldset>
          <input type="checkbox" name="complete__task" id={`task__${task.id}`} onChange={(event) => {handleCompleteTask(event)}}></input>
          <label className="check__label" htmlFor={`task__${task.id}`}>Task Complete</label>
        </fieldset>
        <button className="btn btn-primary" onClick={() => {
          history.push(`/tasks/edit/${task.id}`)
        }}>Edit Task</button>
        <button className="btn btn-primary" onClick={()=>{handleDeleteTask()}}>Delete Task</button>
      </section>
    </>
  )
}