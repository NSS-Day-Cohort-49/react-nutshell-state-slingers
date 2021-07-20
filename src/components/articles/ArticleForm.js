/* Created by: Holly | Purpose: Component to house Article Form and handle state. */

import React, {useContext, useEffect, useState } from "react"
import "./Article.css"
import { useHistory } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = () => {
    const { addArticle, getArticles } = useContext(ArticleContext)
    const { users, getUsers } = useContext(UserContext)
    const history = useHistory();

    const [article, setArticle] = useState({
        userId: 0,
        url: "",
        title:"",
        synopsis: "",
        timestamp:""
    });

    useEffect(() => {
        getArticles()
        .then(getUsers)
    },[])

    const handleControlledInputChange = (event) => {
        const saveNewArticle = {...article }
        saveNewArticle[event.target.id] = event.target.value
        setArticle(saveNewArticle)
    }

    const handleClickSaveArticle = (event) => {
        event.preventDefault()

        const userId = parseInt(sessionStorage.getItem("nutshell_user"))

        const saveNewArticle = {
            userId: userId,
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            timestamp: new Date().toLocaleDateString()
        }
        addArticle(saveNewArticle)
        .then(() => history.push("/"))
    }
    return(
        <form className="articleForm">
        <h2 className="articleForm__title">New Article</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title"> Article Title:</label>
            <input type="text" id="title" required autoFocus className="form-control" placeholder="Article title" value={article.title} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="synopsis">Article Synopsis:</label>
            <input type="text" id="synopsis" required autoFocus className="form-control" placeholder="Article synopsis" value={article.synopsis} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="url">Article URL:</label>
            <input type="text" id="url" required autoFocus className="form-control" placeholder="Article url" value={article.url} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        
        
        <button className="save__btn__article" onClick={handleClickSaveArticle}>
          Save Article
            </button>
      </form>
    )
} 

