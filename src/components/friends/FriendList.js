import React from "react"
import { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"

export const FriendList = () => {

    const { friends, getFriends } = useContext(FriendContext)
    const { user, getUsers } = useContext(userContext)


    
    useEffect(() => {
        getFriends()
    }, [])

    return (
        <>
        <div className="friends">
            <h2 className="friends__header">Friends</h2>
                {friends.map(friend=> {
                    if (friend.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
                        return <FriendCard key={friend.id} friend={friend} />        
                    }
                })}
        </div>
        </>
    )

}
