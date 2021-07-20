//Coded by Michael Trevino. This module provides users an affordance to add a friend by name from the friend page

import React, { useContext, useState, useEffect } from "react"
import { FriendContext } from "./FriendProvider";
import { UserContext } from "../users/UserProvider"

export const FriendForm = () => {

    //Friends context added to check for friends already existing when adding
    const { addFriend, friends } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)
    
    const [friend, setFriend] = useState({
        userId: 0,
        buddyId: 0,
        name: ""
    })
    
    //Get users to match username to userId
    useEffect(() => {
        getUsers()    
     }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
            //Make a copy of friend, update with string value from input. Set to state.
            const newFriend = { ...friend }

            newFriend[event.target.id] = event.target.value
            // update state
            setFriend(newFriend)
    }

    const handleClickSaveFriend = (event) => {
        //Strip whitespace & to lowercase to compare string values
        const nameValue = (friend.name.toLowerCase().replace(/\s/g, ''))
        //Input check to see if ID was captured before saving
        let friendUser = users.find(user => user.name.toLowerCase().replace(/\s/g, '') === nameValue)
        //Check for username match if name match not found
        if (friendUser === undefined) {
            friendUser = users.find(user => user.username === nameValue)
        }
            //No match by full name or username
            if (friendUser === undefined) {
                window.alert("Please enter a valid user's full name or username")
            }
            //Check for already existing relationships between input friend and user
            if (friends.find(friend => (friend.buddyId === friendUser.id && friend.userId === parseInt(sessionStorage.getItem("nutshell_user"))))) {
                window.alert("You are already friends with this user")
            }
            //Successful unique match found, add friend relationship
            else  {
                const buddyId = friendUser.id
                //Post - add
                const newFriend = {
                    userId: parseInt(sessionStorage.getItem("nutshell_user")),
                    buddyId: buddyId  
                }
                addFriend(newFriend)
            }
            //Reset state & input form
            const blankFriend = 
            {
                userId: 0,
                buddyId: 0,
                name: ""
            }
            setFriend(blankFriend)
        }   
        
    return (
        <form className="friendForm">
          <h2 className="friendForm__title">Add a Friend</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Enter a user's full name or username: </label>
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
  



 