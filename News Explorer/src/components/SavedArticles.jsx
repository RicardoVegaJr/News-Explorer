import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../blocks/SavedArticles.css";
import NewsCard from "./NewsCard";

function SavedArticles({ savedArticles, handleRemoveArticle }) {
  const { currentUser } = useContext(CurrentUserContext);

  const uniqueKeywords = [
    ...new Map(
      savedArticles
        .map((a) => (a.keyword || "").trim())
        .filter(Boolean)
        .map((k) => [k.toLowerCase(), k])
    ).values(),
  ];

  const k = uniqueKeywords.length;
  const keywordsLine =
    k === 0
      ? "By keywords:"
      : k === 1
      ? `By keywords: ${uniqueKeywords[0]}`
      : k === 2
      ? `By keywords: ${uniqueKeywords[0]}, ${uniqueKeywords[1]}`
      : `By keywords: ${uniqueKeywords[0]}, ${uniqueKeywords[1]} and ${
          k - 2
        } other${k - 2 > 1 ? "s" : ""}`;

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
