//Built by Michael Trevino. This module displays event cards as HTML.
import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { FriendContext, FriendProvider } from "../friends/FriendProvider"
import "./Event.css"

export const EventList = () => {

    const { events, getEvents } = useContext(EventContext)
    const { friends, getFriends } = useContext(FriendContext)

    useEffect(() => {
        getEvents().then(getFriends)
    }, [])

    return (
        <>
        <div className="events">
            <h2 className="events__header">Events</h2>
                {events.map(event => {
                    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
                    //Check if event is posted by current user or one of user's friends
                    if (event.userId === currentUserId || friends.find(friend => friend.userId === currentUserId && friend.buddyId === event.userId))
                    {
                    return <EventCard key={event.id} event={event} />
                    }
                })}
        </div>
        </>
    )
}