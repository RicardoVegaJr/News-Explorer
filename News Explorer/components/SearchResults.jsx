import "../blocks/SearchResults.css";
import NewsCard from "../components/NewsCard";
import Preloader from "../components/Preloader";
import { useState } from "react";

function SearchResults({articles, isLoading, savedArticles, handleSavedArticle, handleRemoveArticle, setSearchKeyword, searchQuery}) {

  const [visibleCount, setVisibleCount] = useState(6);

  const generateMoreCards = () =>{
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="search__results-container">
      {(isLoading &&
      <Preloader></Preloader>
      )}
      {(!isLoading &&
      <h1 className="search__results-title">Search results</h1>
      )}
      <div className="search__results">
        {articles.slice(0,visibleCount).map((article) => (
  <NewsCard  key={article.url}
  article={article}
  savedArticles={savedArticles}
  handleSavedArticle={handleSavedArticle}
  handleRemoveArticle={handleRemoveArticle}
  setSearchKeyword={setSearchKeyword}
  searchQuery={searchQuery}
  />
))}
      </div>
      <div className="search__results-more-button-wrapper">
        {(!isLoading &&
      <button onClick={generateMoreCards} className="search__results-more-button">Show more</button>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
