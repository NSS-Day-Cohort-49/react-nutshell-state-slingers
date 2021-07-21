/* Created by: Holly | Purpose: Component to display lists Article Cards */

import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import { UserContext } from "../users/UserProvider"
import { FriendContext } from "../friends/FriendProvider"
import "./Article.css"


export const ArticleList = () => {

    // these statea change when 'getArticles()' is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    const { users, getUsers } = useContext(UserContext)
    const { friends, getFriends } = useContext(FriendContext)
    const history = useHistory()
    
    // useEffect - reach out to get `ArticlesList`, `UsersList`, and `FriendsList` upon initial render
    useEffect(() => {
        getArticles()  
        .then(getFriends)
    },[])
    
   
    // make a copy of the articles array for sorting 
    const sortArticles = [...articles ]
    // sort the copied articles array by timestamp newest post to oldest post
    const sortedArticles = sortArticles.sort((a, b) => b.timestamp - a.timestamp)   
   
    return (
        <>
        <h2 className="articleHeader">Articles</h2>
        <div className="add__article">
            <button className="add__article__btn" onClick={() => {history.push("/articles/create")}}>
                Add Article
            </button>
        </div>
        <div className="articles">
            {/* map over sorted array to display article cards */}
            {sortedArticles.map(article => {
                if(article.userId === parseInt(sessionStorage.getItem("nutshell_user")) || friends.find(friend => friend.userId === parseInt(sessionStorage.getItem("nutshell_user")) && friend.buddyId === article.userId)){
                     return <ArticleCard key={article.id} article={article} />
            }})
            }
        </div>
        </>    
    )
}


