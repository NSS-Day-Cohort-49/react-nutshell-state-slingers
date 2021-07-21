//Built by Michael Trevino. This module creates inidividual event components with conditional rendering.
//Module also provides affordances for editing and deleting a user's own events. Because specific event
// information in initial render, before event list passes props, optional chaining is used
import React, { useContext } from "react"
import { EventContext } from "./EventProvider"
import { useHistory } from "react-router"
import "./Event.css"

export const EventCard = ({ event }) => {

const { events, deleteEvent  } = useContext(EventContext)

const history = useHistory()

//Compare timestamp of card event to each event. If largest, a different classname is attached later.
const isLargest = () => {
    let largestTimestamp = event?.date
    for (const compareEvent of events) {
        if (compareEvent.date >= largestTimestamp) {
            largestTimestamp = compareEvent.date
        }
    }
    if (event?.date === largestTimestamp)
    return true
    else return false
}
//Format timestamp to date string for display
const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString()
    return newDate
}
//Reroute to event form & event card
const handleClickEditEvent = () => {
    history.push(`/events/edit/${event.id}`)
}
//Refreshes event list
const handleClickDeleteEvent = () => {
        deleteEvent(event.id)
          .then(() => {
            history.push("/events")
          })
      }

return(
 <>
 {/* Ternary statemenst check most recent events, friend events, and both together for styling purposes */}
<section className={`${event?.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "event" : "event__friend"}
 ${isLargest() === true? "event__soonest" : "event"}
 ${isLargest() && event?.userId === parseInt(sessionStorage.getItem("nutshell_user"))? "event__soonestMine" : "event"}`}>
        <h3 className="event__name">
            {event?.user?.name}'s {event?.name}
        </h3>
        {/* Edit & delete buttons are displayed if current user & if path is the event list(not the specific edit pages) */}
        <div className="event__details"> At {event?.location} on {formatDate(event?.date)}</div>
        {event?.userId ===parseInt(sessionStorage.getItem("nutshell_user")) && history.location.pathname === "/events" ? 
        <button className="btn-edit btn-primary" onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickEditEvent()}}>Edit Event</button> : false}
        {event?.userId ===parseInt(sessionStorage.getItem("nutshell_user")) && history.location.pathname === "/events" ? 
        <button className="btn-delete btn-primary" onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickDeleteEvent()}}>Delete Event</button> : false}
    </section>
</>
)}
