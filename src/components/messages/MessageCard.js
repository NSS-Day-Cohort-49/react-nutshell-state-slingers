// Luz Angelique Madrazo || Component responsible for displaying individual messages

import React from "react";
import "./Message.css";



export const MessageCard = ({ message }) => (
    <div className="msg__wrapper">
    <section className="message">
        <div className="message__div"><img className="message__senderPhoto" src={message.user.userPhoto}></img>
        <div className="message__sender">{ message.user.username }</div></div>
        <p className="message__body">{message.body}</p>  
    </section>
    </div>
);