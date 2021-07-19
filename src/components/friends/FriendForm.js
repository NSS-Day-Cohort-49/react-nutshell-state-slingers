//Coded by Michael Trevino. This module provides users an affordance to add a friend by name from the friend page

import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider";
import { UserContext } from "./UserProvider"

export const FriendForm = () => {

    const { addFriend, } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)
    
    const [friend, setFriend] = useState({
        userId: 0,
        friendId: 0
    })
    
    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        //Check that source in name input
        if (event.target.id ==="name") {

            const newFriend = { ...friend }

            //return user object based on name match, stores id in new variable
            const friendId = users.find(user => user.name === event.target.value).id

            newFriend[friend.Id] = friendId
            // update state
            setFriend(newFriend)
    }}
    const handleClickSaveFriend = (event) => {
            
        const friendId = parseInt(friend.friendId)
        //Input check to see if ID was captured before saving
        if (friendId === 0) {
            window.alert("Please enter a valid user as 'Firstname Lastname'")
        } else  {
                //Post - add
                const newFriend = {
                    userId: parseInt(sessionStorage.getItem("nutshell_user")),
                    friendId: friend.friendId,
                }
                addFriend(newFriend)
            }
        }   

    return (
        <form className="friendForm">
          <h2 className="friendForm__title">Add a Friend</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">User Full Name: </label>
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Friend name" value={user.name} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleClickSaveFriend()
          }}>
              Add Friend
            </button>
        </form>
      )
}
  



 