/* Created by: Holly | Purpose: Component to creat items to display for each article created. */

import React, { useContext, useState } from "react"
import "./Article.css"
import { Link } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider";
import { useHistory } from "react-router-dom";


export const ArticleCard = ({article}) => { 
    const { deleteArticle } = useContext(ArticleContext)
    const history = useHistory();

    const handleDeleteArticle = () => {
        deleteArticle(article.id)
        .then(() => {
          history.push("/")
        })
    };

    const articleDate = new Date (article.timestamp)
    
    const dateDisplay = () => {
        return articleDate.toLocaleString()
    }
    
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    
    return(
        <>
            <section className={article.userId === currentUserId ? "article__user" : "article__buddy"}>
                <h3 className="article__title">{ article.title }</h3>
            <div className="article__synopsis">
                <Link to={{ pathname: article.url}} target={article.url}>
                {article.synopsis}
                </Link>
            </div>
            <div className="article__poster"> Posted By {article.user.name} on {dateDisplay()}
                
            </div>
            {article.userId === currentUserId &&
            <div className="article__btn">
            <button className="edit__article" onClick={() => {history.push(`/articles/edit/${article.id}`)}}>Edit</button>
            <button className="delete__article" onClick={() => {handleDeleteArticle()}}>Delete</button>
            </div>
            }
            </section>
        </>
    )
};
