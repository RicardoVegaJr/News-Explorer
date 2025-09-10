import "../blocks/SearchResults.css";
import NewsCard from "../components/NewsCard";
import Preloader from "../components/Preloader";

function SearchResults({articles, isLoading, savedArticles, handleSavedArticle, handleRemoveArticle}) {

  return (
    <div className="search__results-container">
      {(isLoading &&
      <Preloader></Preloader>
      )}
      {(!isLoading &&
      <h1 className="search__results-title">Search results</h1>
      )}
      <div className="search__results">
        {articles.slice(0,6).map((article) => (
  <NewsCard  key={article.url}
  article={article}
  savedArticles={savedArticles}
  handleSavedArticle={handleSavedArticle}
  handleRemoveArticle={handleRemoveArticle} />
))}
      </div>
      <div className="search__results-more-button-wrapper">
        {(!isLoading &&
      <button className="search__results-more-button">Show more</button>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
