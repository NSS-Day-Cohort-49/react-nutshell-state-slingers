/* Created by: Holly | Purpose: Module to access edit database elements for Articles  */

import React, { useState, createContext } from "react"

//This context is imported and used by individual components that need data
export const ArticleContext = createContext()

//This component establishes what data can be used.
export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([])

    const getArticles = () => {
        return fetch("http://localhost:8088/articles?_expand=user")
            .then(response => response.json())
            .then(setArticles)
    }

    const addArticle = (articleObj) => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleObj)
        })
        .then(response => response.json())
        .then(getArticles)
    }    
    
    const deleteArticle = (articleId) => {
            return fetch(`http://localhost:8088/articles/${articleId}`, {
                method: "DELETE"
            })
            .then(getArticles)
    }
    const updateArticle = (articleObj) => {
        return fetch(`http://localhost:8088/articles/${articleObj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(articleObj)
        })
        .then(getArticles)
      }

    // return a context provider which has 'articles' state, 
    // and getArticles function as keys. This will allow any 
    // child elements to access them.
    
    return (
        <ArticleContext.Provider value={{
            articles, getArticles, addArticle, deleteArticle, updateArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}