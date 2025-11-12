import "../../blocks/NewsCard.css";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import NewsCardImage from "../assets/NewsCardImage.jpg";
import { useLocation } from "react-router-dom";

function NewsCard({
  article,
  savedArticles = [],
  handleSavedArticle,
  handleRemoveArticle,
  keyword,
}) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const alreadySaved = savedArticles.some((a) => a.url === article.url);
    setIsBookmarked(alreadySaved);
  }, [savedArticles, article]);

  const { pathname } = useLocation();

  const onSavedPage = pathname === "/savedarticles";

  const handleBookmarkClick = () => {
    if (onSavedPage) {
      handleRemoveArticle(article);
      setIsBookmarked(false);
      return;
    }
    if (isBookmarked) {
      handleRemoveArticle(article);
      setIsBookmarked(false);
    } else {
      handleSavedArticle(article, keyword);
      setIsBookmarked(true);
    }
  };

  return (
    <section className="card">
      <div className="card__keyword"></div>
      <button
        disabled={!isLoggedIn}
        className={`card__bookmark ${
          isBookmarked ? "is-bookmarked" : "is-empty"
        } ${onSavedPage ? "on-saved" : ""}`}
        onClick={handleBookmarkClick}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <span className="card__bookmark-icon" />
      </button>
      {!isLoggedIn && (
        <button className="card__subtext card__bookmark-disclaimer">
          Sign in to save articles
        </button>
      )}
      {onSavedPage &&(
        <button className="card__subtext card__search-text">
          {keyword}
        </button>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          className="card__image"
          src={article.urlToImage || NewsCardImage}
          alt="News card image"
        />
        <div className="card__text-wrapper">
          <p className="card__date"> {article.publishedAt}</p>
          <h1 className="card__title">
            {article.title ? `${article.title.slice(0, 30)}...` : ""}
          </h1>
          <p className="card__text">
            {article.content ? `${article.content.slice(0, 100)}...` : ""}
          </p>
          <h2 className="card__source">{article.source.name}</h2>
        </div>
      </a>
    </section>
  );
}

export default NewsCard;
