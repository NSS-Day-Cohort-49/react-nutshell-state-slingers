//Created by Michael Trevino. This module creates part of the HTML for the friends component by rendering one or more friend cards, passing each card a matched friend obj
import React from "react"
import { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"
import { UserContext } from "../users/UserProvider"

export const FriendList = () => {

    //Imports users in order to find match to buddyId
    const  { friends, getFriends } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers().then(
        getFriends)
    }, [])

    return (
        <>
        <div className="friends">
            <h2 className="friends__header">Friends</h2>
                {friends?.map(friend=> {
                    if (friend.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
                        //
                        const friendMatch = users.find(user => user.id === friend.buddyId)
                        //Passes both user and friend object for card to reference (card needs user to display & friend to delete)
                        return <FriendCard key={friend.id} user={friendMatch} friend={friend} />        
                    }
                })}
        </div>
        </>
    )

}




