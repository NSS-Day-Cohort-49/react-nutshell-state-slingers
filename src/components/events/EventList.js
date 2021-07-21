//Built by Michael Trevino. This module displays event cards as HTML and provides affordance for adding events.
import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { FriendContext } from "../friends/FriendProvider"
import { useHistory } from "react-router-dom"
import "./Event.css"

export const EventList = () => {

    const [weatherView, setWeatherView] = useState({
        showCurrentWeather:0,
      });

    const history = useHistory()

    const { events, getEvents, weather, getWeather } = useContext(EventContext)
    const { friends, getFriends } = useContext(FriendContext)

    useEffect(() => {
        getEvents().then(getFriends)
        .then(getWeather)
    }, [])

    const handleClickAddEvent = () => {
        history.push(`/events/add`)
    }

    const handleCurrentWeatherClick = () => {
        //Modify copy of state based on input change
        const weatherViewCopy = { ...weatherView }
        if(weatherViewCopy.showCurrentWeather===0){
            weatherViewCopy.showCurrentWeather=1
            setWeatherView(weatherViewCopy)
            
        }
        else if(weatherViewCopy.showCurrentWeather===1){
            weatherViewCopy.showCurrentWeather=0
            setWeatherView(weatherViewCopy)
            
        }
    }
const currentWeatherImg = `http://openweathermap.org/img/wn/${weather?.current?.weather[0].icon}@2x.png`

    return (
        <>
        <div className="events">
            <div className="events-header">
            <h2 className="events__title">Events</h2>
            {/* Button conditionally renders based on pathname */}
        {history.location.pathname==="/events/add"? <div className='hidden'></div>:<button className='btn btn-primary'
        onClick={clickEvent => {
            clickEvent.preventDefault()
            handleClickAddEvent()}}
            >Add New Event</button>}
            <div className="events--weather">
            {weatherView.showCurrentWeather===1? <div className='hidden'></div> :<button className= "btn btn-primary"
        onClick={clickEvent => {
            handleCurrentWeatherClick()}}>
            {weatherView.showCurrentWeather===1? "Hide Weather" : "Show Weather"}
            </button>}
                </div>
            {weatherView.showCurrentWeather===0? <div className='hidden'></div>:<div className="weatherInfo"> 
            <button className="btn btn-primary" onClick={clickEvent => {
                    handleCurrentWeatherClick()}}>
                        Hide Weather
                    </button>
                <img src={currentWeatherImg}/>
                <text className="weatherText">
                {"\n"}
                {weather?.current?.weather[0].main}
                {"\n"}
                {weather?.current?.temp} Fahrenheit
                {"\n"}
                {weather?.current?.humidity}% Humidity
                </text>
            </div>}
            </div>
                {/* Card function is called on events sorted by timestamp(soonest events called first) */}
                {events.sort((a,b) => a.date > b.date ? -1: 1).map(event => {
                    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
                    //Criteria for calling card: Check if event is posted by current user or one of user's friends
                    if (event.userId === currentUserId || friends.find(friend => friend.userId === currentUserId && friend.buddyId === event.userId))
                    {
                    return <EventCard key={event.id} event={event} weather={weather}/>
                    }
                })}
        </div>
        </>
    )}
