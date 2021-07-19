// Luz Angelique Madrazo || Component responsible for displaying individual messages with edit and delete functionalities:

import React, { useContext } from "react";
import { MessageContext } from "./MessageProvider";
import "./Message.css";
import { useHistory} from "react-router-dom";




export const MessageCard = ({ message }) => {

    const { deleteMessage } = useContext(MessageContext)
  
    const history = useHistory();

    const handleDelete = () => {
      deleteMessage(message.id)
      .then(() => {
        history.push("/messages")
      })
      alert("Message has been deleted! 👍")
    };

    
    return (

        <div className="msg__wrapper">
            <section className="message">
                <div className="msg__buttons">
                    <button className="edit__msg">
                        Edit
                    </button>
                    <button className="delete__msg" onClick={() => {handleDelete()}}>Delete</button>
                </div>
                <div className="message__div">
                    <img className="message__senderPhoto" src={message.user.userPhoto}></img>
                    <div className="message__sender">{ message.user.username }</div>
                </div>
                <p className="message__body">{message.body}</p>  
            </section>
        </div>
    )
};



