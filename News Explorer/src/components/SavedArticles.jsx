import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "../../blocks/SavedArticles.css";
import NewsCard from "./NewsCard";




function SavedArticles({savedArticles, handleRemoveArticle}) {

const { currentUser } = useContext(CurrentUserContext);
console.log(currentUser.name);
  return (
    <div className="saved-articles-container">
      <div className="saved-articles__header">
        <p className="saved-articles__title">Saved articles</p>
        <p className="saved-articles__text">{currentUser.name}, you have {savedArticles.length} saved<br /> articles</p>
        <p className="saved-articles__amount">By keywords: {savedArticles[0]?.keyword}, {savedArticles[1]?.keyword} and {savedArticles.length - 2} other</p>
      </div>
      <div className="saved-articles__content">
        {savedArticles.length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        savedArticles.map((article) => (
          <NewsCard key={article.url}
    article={article}
    savedArticles={savedArticles}
    handleRemoveArticle={handleRemoveArticle}/>
        ))
      )}
      </div>
    </div>
  );
}

export default SavedArticles;
