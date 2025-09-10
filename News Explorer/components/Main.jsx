import MainWallpaper from "../src/assets/HomeWallpaper.jpg";
import "../blocks/Main.css";
import { useState } from "react";

function Main({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ searchQuery });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
        <div className="text-wrapper">
          <h1 className="main-page__seach-title">
            What's going on in <br />
            the world?
          </h1>
          <h2 className="main-page__seach-sub-title">
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
    </main>
  );
}

export default Main;
