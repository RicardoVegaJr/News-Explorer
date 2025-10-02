import "../../blocks/NewsCard.css";
import { useState } from "react";
import { useContext } from 'react';
import { useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import NewsCardImage from "../assets/NewsCardImage.jpg";
import NoBookmark from "../assets/NoBookmark.svg"
import ActiveBookmark from "../assets/Bookmarked.svg";
import trashIconGray from "../assets/trashIconGray.svg";


function NewsCard({article,savedArticles = [], handleSavedArticle, handleRemoveArticle,searchQuery}) {


    const { isLoggedIn } = useContext(CurrentUserContext);
      const [isBookmarked, setIsBookmarked] = useState(false);
     

       useEffect(() => {
    const alreadySaved = savedArticles.some((a) => a.url === article.url);
    setIsBookmarked(alreadySaved);
  }, [savedArticles, article]);


const handleBookmarkClick = () => {
  if (isBookmarked) {
    handleRemoveArticle(article);
    setIsBookmarked(false);
    
  } else {
    handleSavedArticle(article, searchQuery);
    setIsBookmarked(true);
  }
};

let iconSrc;
if (location.pathname === "/"){
  iconSrc = isBookmarked ? ActiveBookmark : NoBookmark;
} else if (location.pathname === "/savedarticles") {
  iconSrc = trashIconGray;
}
  
  return (
    <div className="card__container">
      <div className="card__keyword"></div>
      <button disabled={!isLoggedIn} className="card__bookmark" onClick={handleBookmarkClick}>
      <img src={iconSrc} className="card__bookmark-empty card__bookmark-remove"/>
      </button>
      {!isLoggedIn && (
      <button  className="card__bookmark-disclaimer" >Sign in to save articles</button>
      )}
      <img className="card__image" src={article.urlToImage || NewsCardImage}  alt="" />
      <div className="card__text-wrapper">
      <p className="card__date"> {article.publishedAt}</p>
      <h1 className="card__title">{article.title ? `${article.title.slice(0, 30)}...` : ""}</h1>
       <p className="card__text">{article.content ? `${article.content.slice(0, 100)}...` : ""}</p>
      <h2 className="card__source">{article.source.name}</h2>
      </div>
    </div>
  );
}

export default NewsCard;
