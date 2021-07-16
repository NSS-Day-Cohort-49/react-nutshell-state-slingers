import React from 'react'
import './Task.css'

export const TaskCard = ({ task }) => (
  <>
    <section className="task">
      <h3 className="task__name">{task.name}</h3>
      <div className="task__date">{task.completionDate}</div>
      <button>Delete Task</button>
      <fieldset>
      <input type="checkbox" name="complete__task" value="task" id="task"></input>
      <label for="task">Complete Task</label>
      </fieldset>
    </section>
  </>
)