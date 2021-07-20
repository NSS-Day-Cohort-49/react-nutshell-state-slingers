/* Created by: Holly | Purpose: Component to house Article Form and handle state. */

import React, {useContext, useEffect, useState } from "react"
import "./Article.css"
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = () => {
    const { addArticle, getArticles, getArticleById, updateArticle } = useContext(ArticleContext)
    const { users, getUsers } = useContext(UserContext)
    const history = useHistory();
    const { articleId } = useParams();

    const [article, setArticle] = useState({
        userId: 0,
        url: "",
        title:"",
        synopsis: "",
        timestamp:""
    });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getArticles()
        .then(getUsers)
        .then(() =>{
            if(articleId){
                getArticleById(articleId)
                .then(article => {
                    setArticle(article)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
                }
        })
    },[])

    const handleControlledInputChange = (event) => {
        const saveNewArticle = {...article }
        saveNewArticle[event.target.id] = event.target.value
        setArticle(saveNewArticle)
    }
    
    const saveNewArticle = () => {
        const userId = parseInt(sessionStorage.getItem("nutshell_user"))
        const newArticle = {
            userId: userId,
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            timestamp: new Date()
        }
        addArticle(newArticle)
        .then(() => history.push("/"))
    }

    const saveEditArticle = () => {
        const userId = parseInt(sessionStorage.getItem("nutshell_user"))
        updateArticle({
          id: article.id,  
          userId: userId,
          url: article.url,
          title: article.title,
          synopsis: article.synopsis,
          timestamp: new Date()
        })
        .then(() => history.push("/"))
      }
    
      const handleClickSaveArticle = (event) => {
        event.preventDefault()

        if (article.url === null || article.title === null || article.synopsis === null) {
            window.alert("Please complete all fields")
        } else {
            setIsLoading(true);

            if (articleId) {
            //PUT - update
             saveEditArticle()
             } else {
             saveNewArticle()
            }
        }
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
            <input type="text" id="synopsis" required className="form-control" placeholder="Article synopsis" value={article.synopsis} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="url">Article URL:</label>
            <input type="text" id="url" required className="form-control" placeholder="Article url" value={article.url} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        
        
        
        <button className="save__btn__article" onClick={handleClickSaveArticle}>
          Save Article
            </button>
      </form>
    )
} 
