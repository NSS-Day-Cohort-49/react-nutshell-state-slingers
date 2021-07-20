import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./events/EventProvider"
import { EventList } from "./events/EventList"
import { ArticleProvider } from "./articles/ArticleProvider"
import { ArticleList } from "./articles/ArticleList"
import { MessageProvider } from "./messages/MessageProvider";
import { UserProvider } from "./users/UserProvider";
import { MessageList } from "./messages/MessageList";
import { TaskProvider } from "./tasks/TaskProvider"
import { TaskList } from "./tasks/TaskList"
import { TaskForm } from "./tasks/TaskForm"
import { FriendProvider } from "./friends/FriendProvider";
import { FriendList } from "./friends/FriendList";
import { FriendForm } from "./friends/FriendForm";

import { ArticleForm } from "./articles/ArticleForm";
export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
      <FriendProvider>
          {/* Render the component for list of friends */}
        <Route path="/friends">
          <FriendList />
          <FriendForm />
        </Route>

      <ArticleProvider>
        {/* Render the component for news articles */}
          <Route exact path="/">
            <ArticleList />
          </Route>
          <Route exact path="/articles/create">
            <ArticleForm />
          </Route>
      </ArticleProvider>
      </FriendProvider>
      </UserProvider>

      <MessageProvider>
        <UserProvider>
          <Route path="/messages">
            {/* Render the component for the messages */}
            <MessageList />
          </Route>
        </UserProvider>
      </MessageProvider>

      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
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

        {/* Render the component for the user's events */}

        <EventProvider>
          <Route path="/events">
            <EventList />
          </Route>
        </EventProvider>
    </>
  )
}
