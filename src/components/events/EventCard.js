//Built by Michael Trevino. This module creates inidividual event components with conditional rendering.
//Module also provides affordances for editing and deleting a user's own events. Because specific event
// information in initial render, before event list passes props, optional chaining is used
import React, { useContext, useState } from "react"
import { EventContext } from "./EventProvider"
import { useHistory } from "react-router"
import "./Event.css"

export const EventCard = ({ event }) => {

const { events, deleteEvent, weather, getWeather  } = useContext(EventContext)

const [weatherView, setWeatherView] = useState({
    showDayWeather:0,
  });

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

      const handleCurrentWeatherClick = () => {
        //Modify copy of state based on input change
        const weatherViewCopy = { ...weatherView }
        if(weatherViewCopy.showDayWeather===0){
            weatherViewCopy.showDayWeather=1
            setWeatherView(weatherViewCopy)
            
        }
        else if(weatherViewCopy.showDayWeather===1){
            weatherViewCopy.showDayWeather=0
            setWeatherView(weatherViewCopy)
            
        }
    }

    const currentDate = new Date 
    const currentTimestamp = currentDate.getTime()
    
const getWeatherDay = () => {

    const Difference_In_Time = currentTimestamp - event.date;
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    //To display the final no. of days (result)
    const abs = Math.abs(Difference_In_Days-1)
    return Math.floor(abs)
}
const getWeatherImg = () => {
    const currentWeatherImg = `http://openweathermap.org/img/wn/${weather?.daily[getWeatherDay()]?.weather[0].icon}@2x.png`
    return currentWeatherImg
}

return(
 <>
 {/* Ternary statements check most recent events, friend events, and both together for styling purposes */}
<section className={`${event?.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "event" : "event__friend"}
 ${isLargest() === true? "event__soonest" : "event"}
 ${isLargest() && event?.userId === parseInt(sessionStorage.getItem("nutshell_user"))? "event__soonestMine" : "event"}`}>
       <div className="event-header">
        <div className="event__header">
            {event?.user?.name}'s {event?.name}
        {currentTimestamp-event.date >= 604800000? <div className='hidden'></div>:<div className="weatherButton">
        <button className="btn btn-primary" onClick={clickEvent => {
                    handleCurrentWeatherClick()}}>
                        {weatherView.showDayWeather===1? "Hide Weather" : "Show Weather"}
                    </button>
                    {weatherView.showDayWeather===0 || getWeatherDay() >=7?<div className="hidden"></div>:<div className="weatherInfo">
                <text className="weatherText">
                <img src={getWeatherImg()}/>
                {"\n"}
                {weather?.daily[getWeatherDay()]?.temp?.max} Fahrenheit Max
                {"\n"}
                {weather?.daily[getWeatherDay()]?.temp?.min} Fahrenheit Min
                {"\n"}
                {weather?.daily[getWeatherDay()]?.humidity}% Humidity
                </text></div>}</div>}
        </div>
           </div>
        <div className="saveAndEdit">
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
        </div>
    </section>
</>
)}
