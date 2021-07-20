//Coded by Michael Trevino. This component renders the form and manages functions that allows users to add new events and edit their existing events
import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import "./Event.css"
import { useHistory, useParams } from 'react-router-dom';
import { EventCard } from "./EventCard";

export const EventForm = () => {

  const { addEvent, updateEvent, getEventById, getEvents, events } = useContext(EventContext)
//Default input values
  const [event, setEvent] = useState({
    name: "",
    userId: 0,
    date: "",
    time: "",
    location: "",
  });

const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
//Get eventId from link
  const {eventId} = useParams()
  
  //Sets new event if there is an ID available to edit from params through link
   useEffect(() => {
       getEvents().then(() => {
           if(eventId) {
               getEventById(eventId)
               .then(event => {
                   setEvent(event)
                   setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

  const handleControlledInputChange = (clickEvent) => {
    //Modify copy of state based on input change
    const newEvent = { ...event }

    newEvent[clickEvent.target.id] = clickEvent.target.value
    // update state
    setEvent(newEvent)
  }

  const handleClickSaveEvent = (event) => {
      
      const userId = parseInt(sessionStorage.getItem("nutshell_user"))
      //Check to see that input has been entered into all fields
      if (event.name === "" || event.date === "" || event.time === "" || event.location === "") {
          window.alert("Please fill out all fields")
        } else { setIsLoading(true);
            debugger
            //Put - update if eventId already exists/has been passed by params
            //Parse timestamp from date/time input
            const dateString = `${event.date} ${event.time}`
            const dateTimeParts = dateString.split(' ')
            const timeParts = dateTimeParts[1].split(':')
            const dateParts = dateTimeParts[0].split('-')
            
            const date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
            console.log(date.getTime())
            console.log(date); 
            if (eventId) {
                updateEvent({
                    id: event.id,
                    name: event.name,
                    //Convert date object into timestamp for storage
                    date: event.date.getTime(),
                    location: event.location,
                    user: userId
                    
                }).then(
                    //Reroute to events list
                    () => history.push(`/events`)
                    )
                }
                else {
                    //Post - add
                    debugger
                    //Put - update if eventId already exists/has been passed by params
                    //Parse timestamp from date/time input
                    const dateString = `${event.date} ${event.time}`
                    const dateTimeParts = dateString.split(' ')
                    const timeParts = dateTimeParts[1].split(':')
                    const dateParts = dateTimeParts[0].split('-')
                    
                    const date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
                    console.log(date.getTime())
                    console.log(date); 
                    
                    const newEvent = {
                        name: event.name,
                        location: event.location,
                        //Convert date object into timestamp for storage
                        date: event.date.getTime(),
                        location: event.location,
                        user: userId
                    }
                    addEvent(newEvent)
                    //Reroute back to event list
                    .then(() => history.push("/events"))
                }
            }   
        }
        //Formats timestamp to date HTML input to set default value of field during edit
        const formatDateInput = (date) => {
            const dateObj = new Date(date)
            const formattedMonth = (dateObj.getMonth()+1).toString().padStart(2, "0")
            const dateInput = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2,"0")}-${(dateObj.getDate()).toString().padStart(2,"0")}`
            return dateInput
        }
        //Formats timestamp to time HTML input to set default value of field during edit
        const formatTimeInput = (date) => {
            const dateObj = new Date(date)
            const timeInput = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`
            return timeInput
        }
        if (eventId){
            return (
                <>
            <div className="events">
                <EventCard key={eventId} event={events.find(object => object.id === parseInt(eventId))} />
            </div>
            <form className="eventForm">
            <h2 className="eventForm__title">{eventId ? "Edit Event": "New Event"}</h2>
            <fieldset>
            <div className="form-group">
                <label htmlFor="name">Event name:</label>
                <input type="text" id="name" required autoFocus className="form-control" placeholder="Event name" value={event.name} onChange={handleControlledInputChange} 
                defaultValue={event.name}/>
            </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="name">Where?:</label>
                <input type="text" id="location" required autoFocus className="form-control" placeholder="Event location" value={event.location} onChange={handleControlledInputChange} 
                defaultValue={event.location}/>
            </div>
            </fieldset>
                {/* date & time input */}
            <div className="form-group">
            <div className="dateTime">
            <fieldset>
                <div className="date">
                <label htmlFor="date">Select a date:</label>
                <input type="date" id="date" required className="form-control" value={formatDateInput(event.date)} onChange={handleControlledInputChange}
                defaultValue={formatDateInput(event.date)}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="time">
                <label htmlFor="time">Select a time:</label>
                <input type="time" id="time" required className="form-control" value={formatTimeInput(event.date)} onChange={handleControlledInputChange}
                defaultValue={formatTimeInput(event.date)} />
                </div>
            </fieldset>
            </div></div>
            <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
            event.preventDefault()
            handleClickSaveEvent()
            }}>
                { eventId ? "Save Event" : "Create Event" }
            </button>
        </form>
    </>
        )
    }
    else return (   

        <form className="eventForm">
          <h2 className="eventForm__title">{eventId ? "Edit Event": "New Event"}</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Event name:</label>
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Event name" value={event.name} onChange={handleControlledInputChange} 
              defaultValue={event.name}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Where?:</label>
              <input type="text" id="location" required autoFocus className="form-control" placeholder="Event location" value={event.location} onChange={handleControlledInputChange} 
              defaultValue={event.location}/>
            </div>
          </fieldset>
              {/* date & time input */}
            <div className="form-group">
            <div className="dateTime">
            <fieldset>
                <div className="date">
                <label htmlFor="date">Select a date:</label>
                <input type="date" id="date" required className="form-control" value={event.date} onChange={handleControlledInputChange}
                defaultValue={(new Date(event.date).getDate())} />
                </div>
            </fieldset>
            <fieldset>
                <div className="time">
                <label htmlFor="time">Select a time:</label>
                <input type="time" id="time" required className="form-control" value={event.time} onChange={handleControlledInputChange}
                defaultValue={(new Date(event.date).getTime())} />
                </div>
            </fieldset>
            </div></div>
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={clickEvent => {
            event.preventDefault()
            handleClickSaveEvent()
          }}>
              { eventId ? "Save Event" : "Create Event" }
            </button>
        </form>
      )
}
  



 