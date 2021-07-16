// Luz Angelique Madrazo || Component responsible for rendering the list of messages

import React, { useEffect, useContext } from "react";
import { MessageContext } from "./MessageProvider";
import { MessageCard } from "./MessageCard";
import "./Message.css";


export const MessageList = () => {

    const { messages, getMessages } = useContext(MessageContext);

    useEffect(()=>{
        console.log("MessageList: useEffect - getMessages, Initial render before data");
        getMessages()
    }, []);


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
        </>
      );
};