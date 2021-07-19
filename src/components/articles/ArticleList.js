/* Created by: Holly | Purpose: Component to display lists Article Cards */

import React, { useContext, useEffect} from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import "./Article.css"

export const ArticleList = () => {
    // this state changes when 'getArticles()' is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    
    // useEffect - reach out to get `ArticlesList` upon initial render
    useEffect(() => {
        getArticles()
    },[])

    return (
        <>
        <h2>Articles</h2>
        <div className="articles">
            {articles.map(article =>{
                return <ArticleCard key={article.id} article={article} />
            })
            }
        </div>
        </>    
    )
}


