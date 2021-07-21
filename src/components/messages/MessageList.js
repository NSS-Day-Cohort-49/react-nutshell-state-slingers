// Luz Angelique Madrazo || Component responsible for rendering the list of messages and input/functionality to send a new message, along with
//functionality to send a private message to a friend and only the recipient/friend is able to view the private message in the messages list
//which is also styled with different css to differentiate a public vs a private message:

import React, { useEffect, useContext, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { MessageCard } from "./MessageCard";
import { FriendContext } from "../friends/FriendProvider";
import { UserContext } from "../users/UserProvider";
import "./Message.css";



export const MessageList = () => {

    const { messages, getMessages, addMessage } = useContext(MessageContext);
    const { friends } = useContext(FriendContext);
    const { users } = useContext(UserContext);


    useEffect(() => {
        console.log("MessageList: useEffect - getMessages, Initial render before data");
        getMessages()
    }, []);


    const [message, setMessage] = useState({
        userId: 0,
        recipientId: null,
        body: "",
        isPrivate: false
    });

    const [messageBarState, setMessageBarState] = useState({
        messageBar: false
    });

    const handleControlledInputChange = (event) => {
    //since a contentEditable element/attribute is being used in the input, whatever the user writes will be added to the textContent/innerHTML/innerText
    // of the element instead of the value; this makes the value attribute unusable which is why textContent is being targeted instead of the value below.
        if (event.target.textContent.startsWith("@")) {
    // if the first character the user writes is "@" then the messageBar state changes to true which will render the private message bar instead.
            let privateMessage = messageBarState
            privateMessage.messageBar = true;
            // The isPrivate property is also changed to true since the user is writing a private message.
            let newMessage = message;
            newMessage.isPrivate = true;
            // the message is set here so that it sets isPrivate to the message object.
            // also setMessageBarState to re-render and the private message bar appears.
            setMessage(newMessage);
            setMessageBarState(privateMessage);
        } else {
            // if the first character is no longer "@" or it never was to begin with, then change the state of the message bar to false so that 
            //the regular/public message bar renders.
            let privateMessage = messageBarState
            privateMessage.messageBar = false;
            // sets the isPrivate property back to false since its no longer a private message or it never was.
            let newMessage = message;
            newMessage.isPrivate = false;
            // set the message and change the state of the messageBar so that it re-renders.
            setMessage(newMessage);
            setMessageBarState(privateMessage);
        }

        // the code below will always execute no matter what condition is set above
        // Looping through the users and also looping through the friends.
        // If what the user wrote in the messageBar "event.target.textContent" includes the username AND the user id is the same as the friend
        // (buddy Id) which means it is checking to see if the sender is friends with the recipient.
        let userFound = users.find((user) => {
            let friendFound = friends.find((friend) => {
                if (event.target.textContent.includes(user.username) && user.id === friend.buddyId) {
                    console.log('user', user, 'friend', friend);
                    return user;
                }
            })
            return friendFound;
        });

        const newMessage = { ...message }
        // the value assigned to the body property in the newMessage is the event.target.textContent which is what the user wrote, BUT since the
        // "@" can never be taken out due to the textContent element, then need to use the replace method to remove it when putting the value into
        // the newMessage.body property.
        //The replace() method returns a new string with some or all matches of a pattern replaced by a replacement with original string unchanged
        newMessage[event.target.id] = event.target.textContent.replace("@", "");
        // this condition is for when the user is writing a private message, it will meet the condition if userFound is not undefined meaning user is
        // writing a private message to a friend.
        if (typeof userFound !== 'undefined') {
            // Storing the userFound "friend" id to the recipientId of the new message
            newMessage.recipientId = userFound.id;
        // Replacing the userFound "friend" username with an empty string (nothing) again so that the only thing left that is sent is the actual message
            newMessage.body = newMessage.body.replace(userFound.username, "");
            setMessage(newMessage);
        } else {
            // this is for public messages
            setMessage(newMessage);
        }
    };

    const saveNewMessage = (event) => {
        if (message.body.length === 0) {
            alert("Your message cannot be empty! 🙅")
        } else {
            message.userId = parseInt(sessionStorage.getItem("nutshell_user"));
            addMessage(message)
     
            let newMessage = { ...message }
            // because the event attached to the send message image is a click event,  we are able to get the sibling of the event's target
            //which is the message bar and resetting the value of the textContent (which has no value attribute to target) to an empty string
            event.target.previousElementSibling.textContent = ''; 
            newMessage.body = '';
            setMessage(newMessage)
        }
    };   


    let messageButtons;
    let classUnflipped;
    let classFlipped;

    // the first condition checks that the user who sent the message is the same as the active/current user logged in, which will render all of 
    //the active/current user's  non private messages.
    // the second condition checks to see if the message is not private, which means it will render all the public messages.
    // the third condition checks the user who sent the message is the current user AND also if the message is private, this will render the user's private messages.
    // the last condition checks that the user who received the message is the current/active user and friend AND the message is private, this will render their 
    //received private messages when they are logged in.
    //suppressContentEditableWarning={true} is to get rid of the contentEditable attribute when it has a child element which is the p element below
    //contentEditable={true} allows you to modify the content of any element with help of ::before pseudo class name in css file

    return (
        <>
            <h2 className="messageHeader">Messages</h2>

            <div className="messages">
                {messages.map((message) => {
                    if (message.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
                        classUnflipped = "unflippedClass nonPrivateMessage";
                        messageButtons = true;
                        return <MessageCard key={message.id} message={message} classProp={classUnflipped} msgButProp={messageButtons}/>;
                    } else if (message.isPrivate === false) {
                        classFlipped = "flippedClass nonPrivateMessage";
                        messageButtons = false;
                        return <MessageCard key={message.id} message={message} classProp={classFlipped} msgButProp={messageButtons}/>;
                    } else if (message.userId === parseInt(sessionStorage.getItem("nutshell_user")) && message.isPrivate === true ) {
                        classUnflipped = "unflippedClass privateMessage";
                        messageButtons = true;
                        return <MessageCard key={message.id} message={message} classProp={classUnflipped} msgButProp={messageButtons}/>;
                    } else if (message.recipientId === parseInt(sessionStorage.getItem("nutshell_user")) && message.isPrivate === true) {
                        classFlipped = "flippedClass privateMessage";
                        messageButtons = false;
                        return <MessageCard key={message.id} message={message} classProp={classFlipped} msgButProp={messageButtons}/>;
                    }
                })}
            </div>
            <div className="field">
                {messageBarState.messageBar ?
                <>
                    <label className="label" htmlFor="messageContent">Private Message:</label> 
                    <div contentEditable={true}  suppressContentEditableWarning={true} id="body" type="text" name="messageContent" className="content" rows="1" cols="60" placeholder="Type Private Message" onInput={(event) => {handleControlledInputChange(event)}} value={message.body}>
                        <p></p>
                    </div>
                </>
                 :
                 <>
                    <label className="label" htmlFor="messageContent">Public Message:</label> 
                    <div  contentEditable={true} suppressContentEditableWarning={true} id="body" type="text" name="messageContent" className="content" rows="1" cols="60" placeholder="Type Public Message..." onInput={(event) => {handleControlledInputChange(event)}} value={message.body}>
                        <p></p>
                    </div>
                </>
                }
                
                <img className="sendMsgBut" src="https://img.icons8.com/color/60/000000/filled-sent.png" onClick={(event) => {saveNewMessage(event)}}/>
            </div>
        </>
      );
};