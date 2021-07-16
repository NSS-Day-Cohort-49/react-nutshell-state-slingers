//Built by Michael Trevino. This module displays event cards as HTML.
import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import "./Event.css"

export const EventList = () => {

    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
        <div className="events">
            <h2 className="events__header">Events</h2>
                {events.map(event => {
                    return <EventCard key={event.id} event={event} />
                })}
        </div>
        </>
    )
}