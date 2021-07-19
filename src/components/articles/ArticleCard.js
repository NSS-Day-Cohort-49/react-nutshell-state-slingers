/* Created by: Holly | Purpose: Component to creat items to display for each article created. */

import React from "react"
import "./Article.css"
import { Link } from "react-router-dom"

export const ArticleCard = ({article}) => (
    <section className="article">
        <h2 className="article__title">
            { article.title } 
        </h2>
        <div className="article__synopsis">
        <Link to={{ pathname: "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/"}} target="https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/">
        {article.synopsis}
        </Link>
        </div>
        <button className="edit__article">Edit</button>
        <button className="delete__article" >Delete</button>

    </section>
)
