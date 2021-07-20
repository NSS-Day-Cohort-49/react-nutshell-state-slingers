//Built by Michael Trevino. This module creates individual friend elements.
import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import "./Friends.css"

//Friend card takes user argument to display name and friend argument to delete friends
export const FriendCard = ({ user, friend }) => {

    const { deleteFriend } = useContext(FriendContext)
    
    const handleDelete = () => {
        deleteFriend(friend.id)
    }

    return (
        <>
    <section className="friend">
        <h3 className="friend__name">
            You are friends with {user.name}
        </h3>
        <button className ="delete__friend" onClick={() => {handleDelete()}}>Remove Friend</button>
        </section>
        </>
    )
}