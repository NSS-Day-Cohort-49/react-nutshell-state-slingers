// Luz Angelique Madrazo || Component responsible for displaying individual messages

import React from "react";
import "./Message.css";



export const MessageCard = ({ message }) => (
    <section className="message">
        <h3 className="message__body">{message.body}</h3>
        <div className="message__sender">Sent By: { message.user.username }</div>
    </section>
);