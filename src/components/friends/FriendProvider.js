// Created by Michael Trevino. This component provides access to data for friends

import React, { useState, createContext } from "react";

export const FriendContext = createContext();

export const FriendProvider = (props) => {

    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends?_expand=user")
        .then(res => res.json())
        .then(setFriends)
    }

    let addFriend = (friendObj) => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObj)
        })
        .then(getFriends)
    };

    const deleteFriend = (friendObjId) => {
        
        return fetch(`http://localhost:8088/friends/${friendObjId}`, {
            method: "DELETE"
        })
            .then(getFriends)
    }   

    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}?_expand=user`)
            .then(res => res.json())
    };
    
    return (
        <FriendContext.Provider value ={{
            friends, getFriends, addFriend, deleteFriend, getFriendById
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}