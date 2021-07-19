import React from "react"
import { Route } from "react-router-dom"
import { ArticleProvider } from "./articles/ArticleProvider"
import { ArticleList } from "./articles/ArticleList"
import { MessageProvider } from "./messages/MessageProvider";
import { UserProvider } from "./users/UserProvider";
import { MessageList } from "./messages/MessageList";
import { ArticleForm } from "./articles/ArticleForm";
export const ApplicationViews = () => {
  return (
    <>

        {/* Render the component for news articles */}
      <ArticleProvider>
        <UserProvider>
          <Route exact path="/">
            <ArticleList />
          </Route>

          <Route exact path="/articles/create">
            <ArticleForm />
          </Route>
        </UserProvider>
      </ArticleProvider>

      <Route path="/friends">
        {/* Render the component for list of friends */}
      </Route>

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
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
