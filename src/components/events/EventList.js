//Built by Michael Trevino. This module displays event cards as HTML.
import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { FriendContext } from "../friends/FriendProvider"
import { useHistory } from "react-router-dom"
import "./Event.css"

export const EventList = () => {

    const history = useHistory()

    const { events, getEvents } = useContext(EventContext)
    const { friends, getFriends } = useContext(FriendContext)

    useEffect(() => {
        getEvents().then(getFriends)
    }, [])

    const handleClickAddEvent = () => {
        history.push(`/events/add`)
    }

    return (
        <>
        <div className="events">
            <h2 className="events__header">Events</h2>
            {/* Button conditionally renders based on pathname */}
        {history.location.pathname==="/events/add"? <div className='hidden'></div>:<button className='btn btn-primary'
        onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickAddEvent()}}
            >Add New Event</button>}
                {/* Card function is called on events sorted by timestamp(soonest events called first) */}
                {events.sort((a,b) => a.date > b.date ? -1: 1).map(event => {
                    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
                    //Criteria for calling card: Check if event is posted by current user or one of user's friends
                    if (event.userId === currentUserId || friends.find(friend => friend.userId === currentUserId && friend.buddyId === event.userId))
                    {
                    return <EventCard key={event.id} event={event} />
                    }
                })}
        </div>
        </>
    )
}