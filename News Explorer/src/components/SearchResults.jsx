import "../../blocks/SearchResults.css";
import NewsCard from "../components/NewsCard";
import Preloader from "../components/Preloader";
import { useState } from "react";

function SearchResults({
  articles,
  isLoading,
  savedArticles,
  handleSavedArticle,
  handleRemoveArticle,
  setSearchKeyword,
  searchQuery,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const generateMoreCards = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="search-results">
      {isLoading && <Preloader></Preloader>}
      {!isLoading && <h1 className="search-results__title">Search results</h1>}
      <div className="search-results__list">
        {articles.slice(0, visibleCount).map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            savedArticles={savedArticles}
            handleSavedArticle={handleSavedArticle}
            handleRemoveArticle={handleRemoveArticle}
            setSearchKeyword={setSearchKeyword}
            searchQuery={searchQuery}
            keyword={searchQuery}
          />
        ))}
      </div>
      <div className="search-results__more">
        {!isLoading && (
          <button
            onClick={generateMoreCards}
            className="search-results__more-button"
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
