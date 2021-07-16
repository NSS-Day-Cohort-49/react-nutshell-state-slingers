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

    return (
        <EventContext.Provider value={{
            events, getEvents
        }}>
            {props.children}
        </EventContext.Provider>
    )
}