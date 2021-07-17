// Luz Angelique Madrazo || Component responsible for rendering the list of messages

import React, { useEffect, useContext, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { MessageCard } from "./MessageCard";
import "./Message.css";


export const MessageList = () => {

    const { messages, getMessages, addMessage } = useContext(MessageContext);

    useEffect(()=>{
        console.log("MessageList: useEffect - getMessages, Initial render before data");
        getMessages()
    }, []);


    const [message, setMessage] = useState({
        userId: 0,
        body: "",
        isPrivate: false
    });

    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newMessage = { ...message }
        /* Message is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newMessage[event.target.id] = event.target.value
        // update state
        setMessage(newMessage)
    };

    return (
        <>
            <h2 className="messageHeader">Messages</h2>

            <div className="messages">
                {console.log("MessageList - Render: messages", messages)}
                    {messages.map((message) => {
                        return <MessageCard key={message.id} message={message} />;
                    })
                }
            </div>
            <div class="field">
                <label class="label" for="messageContent">New Message:</label>
                <textarea id="body" type="text" name="messageContent" class="content" rows="1" cols="60"placeholder="Type Message..." onChange={(event) => {handleControlledInputChange(event)}}>
                </textarea>
                <img className="sendMsgBut" src="https://img.icons8.com/color/60/000000/filled-sent.png" onClick={() => {
                    let userFound = messages.find((message) => {
                        if (message.user.id === parseInt(sessionStorage.getItem("nutshell_user"))) {
                            return message.user
                        }
                   });
                   message.userId = userFound.id;
                   addMessage(message);
                }}/>
            </div>
        </>
      );
};