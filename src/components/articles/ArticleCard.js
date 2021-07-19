/* Created by: Holly | Purpose: Component to creat items to display for each article created. */

import React from "react"
import "./Article.css"
import { Link } from "react-router-dom"
export const ArticleCard = ({article}) => (
    <section className="article">
        <h2 className="article__title">
            <Link to={"https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/"}>
            { article.title } 
            </Link>
        </h2>
        <div className="article__synopsis">{article.synopsis}</div>
    </section>
)
