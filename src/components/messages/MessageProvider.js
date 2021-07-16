// Luz Angelique Madrazo || Component responsible for providing data to other components than need them.

import React, { useState, createContext } from "react";



export const MessageContext = createContext();

export const MessageProvider = (props) => {

    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(res => res.json())
        .then(setMessages)
    };


    return (
        <MessageContext.Provider value={{
            messages, getMessages
        }}>
            {props.children}
        </MessageContext.Provider>
    )

};