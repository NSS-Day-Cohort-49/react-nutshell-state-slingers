// Luz Angelique Madrazo || Component responsible for displaying individual messages with edit and delete functionalities along with a click
// affordance on the message sender's username in the chat history which allows the current/active user to add that user as a friend:

import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { FriendContext } from "../friends/FriendProvider";
import { UserContext } from "../users/UserProvider";
import "./Message.css";
import { useHistory} from "react-router-dom";



export const MessageCard = ({ message, classProp, msgButProp }) => {

    const { deleteMessage, updateMessage, getMessages } = useContext(MessageContext)
    const { getUsers } = useContext(UserContext)
    const { friends, getFriends, addFriend} = useContext(FriendContext)


    //Initial state of unedited message object:
    const [uneditedMessage, setUneditedMessage] = useState({
        messageState: false
    });
  
    const history = useHistory();

    useEffect(() => {
        getUsers()
        .then(getFriends)
        .then(getMessages);
    }, []);

    //Delete function:
    const handleDelete = () => {
      deleteMessage(message.id)
      .then(() => {
        history.push("/messages")
      })
    //   alert("Message has been deleted! 👍")
    };


    //Function for handling and toggling edited vs unedited message views:
    const handleEdit = () => {
        setUneditedMessage(true)
    };

    //Initial state of updated message object:
    const [updatedMessage, setUpdatedMessage] = useState({
        id: message.id,
        recipientId: message.recipientId,
        userId: parseInt(sessionStorage.getItem("nutshell_user")),
        body: "",
        isPrivate: false
    });

    //Change event listener for recording new message input
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newMessage = { ...updatedMessage }
        /* Message is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newMessage[event.target.id] = event.target.value 
        // update state
        setUpdatedMessage(newMessage);
    };

    //Edit message function:
    const saveEditMessage = () => {
        if (updatedMessage.body.length === 0) {
            updatedMessage.body = message.body
                updateMessage(updatedMessage);
                setUneditedMessage(false);
                // alert("You cannot save an empty message! 🙅");
        } else {
            if (updatedMessage.body === message.body) {
                updateMessage(updatedMessage);
                setUneditedMessage(false);
                // alert("You cannot save an empty message! 🙅");
            } else {
                updateMessage(updatedMessage);
                setUneditedMessage(false);
                // alert("Message Updated! 💌");
            }
        }
    };

    //Text area for message input conditionally rendered whether in unedited or updating state:

    let messageInput;
    if (uneditedMessage === true) {
        messageInput = 
        <div className="update__message">
            <textarea id="body" className="message__body" defaultValue={message.body} onChange={(event) => {handleControlledInputChange(event)}}></textarea>
            <button className="update__button" onClick={() => {saveEditMessage()}}>Save</button>                 
        </div>
    } else {
        messageInput = <p className="message__body">{message.body}</p> 
    };

    // Function for adding a user as a friend in the chat history:

    const saveNewFriend = () => {

        if (friends.find(friend => (friend.buddyId === message.userId && friend.userId === parseInt(sessionStorage.getItem("nutshell_user"))))) {
            alert("You are already friends with this user! 🙅")
        } else {
            const newFriend = {
                buddyId: message.userId,
                userId: parseInt(sessionStorage.getItem("nutshell_user"))
            };
            alert("Are you sure you want to add user to your friend list? 😀")
            addFriend(newFriend);
            alert("User added as a friend! 😊")
        }; 
    };

    return (

        <div className="msg__wrapper">
            <section className={classProp}>
                <div className="msg__buttons">
                    {
                        msgButProp ? 
                            <>
                                <button className="edit__msg" onClick={() => {handleEdit(message)}}>
                                    Edit
                                </button>
                                <button className="delete__msg" onClick={() => {handleDelete()}}>Delete</button>
                            </>  
                        : null
                    }
                </div>
                <div className="message__div">
                    <img className="message__senderPhoto" src={message?.user?.userPhoto}></img>
                    <div className="message__sender" onClick={() => {saveNewFriend()}}>{ message?.user?.username }</div>
                </div>
                {messageInput} 
            </section>
        </div>
    );
};
