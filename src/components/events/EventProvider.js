// Coded by Michael Trevino. This module manages functions to interface with API to create context for the Event component
import React, { useState, createContext } from "react"

export const EventContext = createContext()

//EventProvider export establishes what data can be used
export const EventProvider = (props) => {

    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8088/events?_expand=user")
        .then(res => res.json())
        .then(setEvents)
    }

    const addEvent = eventObj => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
        .then(response => response.json())
    }

    const deleteEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
          method: "DELETE"
        })
          .then(getEvents)
    }

    const updateEvent = eventObj => {
        return fetch(`http://localhost:8088/events/${eventObj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventObj)
        })
          .then(getEvents)
      }

      const getEventById = (id) => {
        return fetch(`http://localhost:8088/events/${id}?_expand=user`)
        .then(res => res.json())
    }

    return (
        <EventContext.Provider value={{
            events, getEvents, addEvent, deleteEvent, updateEvent, getEventById
        }}>
            {props.children}
        </EventContext.Provider>
    )
}

