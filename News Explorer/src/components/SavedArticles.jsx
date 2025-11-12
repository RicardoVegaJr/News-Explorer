import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../blocks/SavedArticles.css";
import NewsCard from "./NewsCard";

function SavedArticles({ savedArticles, handleRemoveArticle }) {
  const { currentUser } = useContext(CurrentUserContext);

  const count = savedArticles.length;

  const keywordsLine = (() => {
    if (count === 0) return "By keywords:";
    if (count === 1) return `By keywords: ${savedArticles[0].keyword}`;
    if (count === 2)
      return `By keywords: ${savedArticles[0].keyword}, ${savedArticles[1].keyword}`;
    // 3 or more
    const others = count - 2;
    return `By keywords: ${savedArticles[0].keyword}, ${
      savedArticles[1].keyword
    } and ${others} other${others > 1 ? "s" : ""}`;
  })();

  return (
    <section className="saved-articles">
      <div className="saved-articles__header">
        <p className="saved-articles__title">Saved articles</p>
        <p className="saved-articles__text">
          {currentUser.name}, you have {savedArticles.length} saved articles
        </p>
        <p className="saved-articles__amount">{keywordsLine}</p>
      </div>
      <div className="saved-articles__content">
        {savedArticles.length === 0 ? (
          <p>No saved articles yet.</p>
        ) : (
          savedArticles.map((article) => (
            <NewsCard
              key={article.url}
              article={article}
              savedArticles={savedArticles}
              keyword={article.keyword}
              handleRemoveArticle={handleRemoveArticle}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default SavedArticles;
