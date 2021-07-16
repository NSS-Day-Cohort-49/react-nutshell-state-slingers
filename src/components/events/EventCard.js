//Built by Michael Trevino. This module creates inidividual event components.
import React from "react"
import "./Event.css"

const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString()
    return newDate
}
export const EventCard = ({ event }) => (
    <section className="event">
        <h3 className="event__name">
            {event.user.name}'s {event.name}
        </h3>
        <div className="event__details"> At {event.location} on {formatDate(event.date)}</div>
    </section>
)