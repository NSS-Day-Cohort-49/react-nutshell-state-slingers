/* Created by: Holly | Purpose: Component to creat items to display for each article created. */

import React, { useContext, useState } from "react"
import "./Article.css"
import { Link } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider";
import { useHistory } from "react-router-dom";
import { UserContext } from "../users/UserProvider";


export const ArticleCard = ({article, user}) => { 
    const { deleteArticle } = useContext(ArticleContext)
    const history = useHistory();

    const handleDeleteArticle = () => {
        deleteArticle(article.id)
        .then(() => {
          history.push("/")
        })
    };

    return(
        <>
            <section className="article">
                <h3 className="article__title">{ article.title }</h3>
            <div className="article__synopsis">
                <Link to={{ pathname: article.url}} target={article.url}>
                {article.synopsis}
                </Link>
            </div>
            <div className="article__poster"> Posted By {article.user.name} on {article.timestamp}
                
            </div>
            
            <div className="article__btn">
            <button className="edit__article" onClick={() => {history.push(`/articles/edit/${article.id}`)}}>Edit</button>
            <button className="delete__article" onClick={() => {handleDeleteArticle()}}>Delete</button>
            </div>
            </section>
        </>
    )
};
