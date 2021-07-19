//Built by Michael Trevino. This module creates individual friend elements.
import React from "react"
import "./Friends.css"

export const FriendCard = ({ friend }) => (
    <section className="friend">
        <h3 className="friend__name">
            You are friends with {friend.user.name}
        </h3>
    </section>
)
