// Coded by Michael Trevino. This module manages functions to interface with API to create context for the Event component
import React, { useState, createContext } from "react"

export const EventContext = createContext()

//EventProvider export establishes what data can be used
export const EventProvider = (props) => {

    const [events, setEvents] = useState([])
    const [ weather, setWeather ] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8088/events?_expand=user")
        .then(res => res.json())
        .then(setEvents)
    }

    const getWeather = () => {
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=36.1627&lon=-86.7816&exclude=minutely,hourly,alerts&units=imperial&appid=07a57064529c1b28e333da353b192c35")
        .then(res => res.json())
        .then(setWeather)
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
            events, getEvents, addEvent, deleteEvent, updateEvent, getEventById, weather, getWeather
        }}>
            {props.children}
        </EventContext.Provider>
    )
}

