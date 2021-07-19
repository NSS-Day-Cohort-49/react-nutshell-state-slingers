/* Created by: Holly | Purpose: Component to creat items to display for each article created. */

import React from "react"
import "./Article.css"
import { Link } from "react-router-dom"

export const ArticleCard = ({article}) => (
    <section className="article">
        <h3 className="article__title">
            { article.title } 
        </h3>
        <div className="article__synopsis">
        <Link to={{ pathname: "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/"}} target="https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/">
        {article.synopsis}
        </Link>
        </div>
        <div className="article__btn">
        <button className="edit__article">Edit</button>
        <button className="delete__article" >Delete</button>
        </div>
    </section>
)
