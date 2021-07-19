/* Created by: Holly | Purpose: Component to display lists Article Cards */

import React, { useContext, useEffect} from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    // this state changes when 'getArticles()' is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()
    
    // useEffect - reach out to get `ArticlesList` upon initial render
    useEffect(() => {
        getArticles()
    },[])

    return (
        <>
        <h2>Articles</h2>
        <div className="add__article">
            <button className="add__article__btn" onClick={() => {history.push("/articles/create")}}>
                Add Article
            </button>
        </div>
        <div className="articles">
            {articles.map(article =>{
                return <ArticleCard key={article.id} article={article} />
            })
            }
        </div>
        </>    
    )
}


