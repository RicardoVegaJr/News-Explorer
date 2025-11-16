import MainWallpaper from "../assets/HomeWallpaper.jpg";
import "../../blocks/Main.css";
import SearchResults from "./SearchResults";
import About from "./About";

function Main({
  handleSearch,
  setSearchKeyword,
  savedArticles,
  handleSavedArticle,
  handleRemoveArticle,
  isLoading,
  articles,
  searchInitiated,
  searchQuery,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ searchQuery });
  };

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
        <div className="main-page__text-wrapper">
          <h1 className="main-page__search-title">
            What&apos;s going on in the world?
          </h1>
          <h2 className="main-page__search-subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </h2>
          <form
            className="main-page__search-bar-wrapper"
            onSubmit={handleSubmit}
          >
            <input
              className="main-page__search-bar"
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="    Enter topic"
            ></input>
            <button className="main-page__search-button">Search</button>
          </form>
        </div>
      </div>
      {searchInitiated && location.pathname !== "/savedarticles" && (
        <SearchResults
          searchQuery={searchQuery}
          setSearchKeyword={setSearchKeyword}
          savedArticles={savedArticles}
          handleSavedArticle={handleSavedArticle}
          handleRemoveArticle={handleRemoveArticle}
          isLoading={isLoading}
          articles={articles}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
