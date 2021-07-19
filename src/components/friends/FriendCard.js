//Built by Michael Trevino. This module creates individual friend elements.
import React, {useContext, useEffect} from "react"
import { FriendContext } from "./FriendProvider"
import "./Friends.css"
//Get user data to match name to passed friend ID

export const FriendCard = ({ friend }) => {
    
    const { deleteFriend } = useContext(FriendContext)
    
    const handleDelete = (friendId) => {
        deleteFriend(friendId)
    }

    return (
        <>
    <section className="friend">
        <h3 className="friend__name">
            You are friends with {friend.name}
        </h3>
        <button onClick={handleDelete(friend.id)}>Remove Friend</button>
        </section>
        </>
    )
}

