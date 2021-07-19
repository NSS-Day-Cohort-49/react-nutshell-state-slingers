import React from "react"
import { Route } from "react-router-dom";
import { MessageProvider } from "./messages/MessageProvider";
import { MessageList } from "./messages/MessageList";
import { TaskProvider } from "./tasks/TaskProvider"
import { TaskList } from "./tasks/TaskList"
import { TaskForm } from "./tasks/TaskForm"

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        {/* Render the component for news articles */}
      </Route>
      <Route path="/friends">
        {/* Render the component for list of friends */}
      </Route>

      <MessageProvider>
          <Route path="/messages">
            {/* Render the component for the messages */}
            <MessageList />
          </Route>
      </MessageProvider>

      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
      </Route>
      <Route path="/messages">
        {/* Render the component for the messages */}
      </Route>
      
      <TaskProvider>
        <Route exact path="/tasks">
          <TaskList />
        </Route>
        <Route exact path="/tasks/create">
          <TaskForm />
        </Route>
      </TaskProvider>

      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
