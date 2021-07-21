//Built by Michael Trevino. This module creates inidividual event components.
import React, { useContext } from "react"
import { EventContext } from "./EventProvider"
import { useHistory } from "react-router"
import "./Event.css"

export const EventCard = ({ event }) => {

const { events, getEvents, getEventById, deleteEvent  } = useContext(EventContext)

const history = useHistory()

const isLargest = () => {
    let largestTimestamp = event.date
    for (const compareEvent of events) {
        if (compareEvent.date >= largestTimestamp) {
            largestTimestamp = compareEvent.date
        }
    }
    if (event.date === largestTimestamp)
    return true
    else return false
}

const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString()
    return newDate
}

const handleClickEditEvent = () => {
    history.push(`/events/edit/${event.id}`)
}

const handleClickDeleteEvent = () => {
        deleteEvent(event.id)
          .then(() => {
            history.push("/events")
          })
      }

return(
 <>
<section className={`${event.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "event" : "event__friend"}
 ${isLargest() === true? "event__soonest" : "event"}
 ${isLargest() && event.userId === parseInt(sessionStorage.getItem("nutshell_user"))? "event__soonestMine" : "event"}`}>
        <h3 className="event__name">
            {event?.user?.name}'s {event?.name}
        </h3>
        <div className="event__details"> At {event?.location} on {formatDate(event?.date)}</div>
        {event.userId ===parseInt(sessionStorage.getItem("nutshell_user")) ? 
        <button className="btn-edit btn-primary" onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickEditEvent()}}>Edit Event</button> : false}
        {event.userId ===parseInt(sessionStorage.getItem("nutshell_user")) ? 
        <button className="btn-delete btn-primary" onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickDeleteEvent()}}>Delete Event</button> : false}
    </section>
</>
)}
