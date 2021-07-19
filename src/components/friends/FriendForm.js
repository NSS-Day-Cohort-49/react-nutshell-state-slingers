//Coded by Michael Trevino. This module provides users an affordance to add a friend by name from the friend page

import React, { useContext, useState, useEffect } from "react"
import { FriendContext } from "./FriendProvider";
import { UserContext } from "../users/UserProvider"

export const FriendForm = () => {

    const { addFriend, } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)
    
    const [friend, setFriend] = useState({
        userId: 0,
        friendId: 0,
        name: ""
    })
    
    useEffect(() => {
        getUsers()    
     }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {

            const newFriend = { ...friend }

            newFriend[event.target.id] = event.target.value
            // update state
            setFriend(newFriend)
    }

    const handleClickSaveFriend = (event) => {
            
        const friendUser = users.find(user => user.name === friend.name)
        const friendId = friendUser.id
        //Input check to see if ID was captured before saving
        if (friendId === 0) {
            window.alert("Please enter a valid user as 'Firstname Lastname'")
        } else  {
                //Post - add
                const newFriend = {
                    userId: parseInt(sessionStorage.getItem("nutshell_user")),
                    friendId: friendId  
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
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Friend name" value={friend.name} onChange={handleControlledInputChange} />
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
  



 