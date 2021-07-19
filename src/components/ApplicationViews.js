import React from "react"
import { Route } from "react-router-dom";
import { MessageProvider } from "./messages/MessageProvider";
import { UserProvider } from "./users/UserProvider";
import { MessageList } from "./messages/MessageList";
import { FriendProvider } from "./friends/FriendProvider";
import { FriendList } from "./friends/FriendList";
import { FriendForm } from "./friends/FriendForm";

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        {/* Render the component for news articles */}
      </Route>
      <UserProvider>
      <FriendProvider>
        <Route path="/friends">
          {/* Render the component for list of friends */}
          <FriendList />
          <FriendForm />
      </Route>
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
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
