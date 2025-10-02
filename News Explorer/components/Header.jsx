import "../blocks/Header.css";
import ProfileIcon from "../src/assets/ProfileImageIcon.svg";
import ProfileIconBlack from "../src/assets/ProfileImageIconBlack.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import menuIcon from "../src/assets/menuIcon.svg";
import menuIconBlack from "../src/assets/menuIconBlack.svg";


function Header({
  handleSigninClick,
  handleLogout,
  toggleAboutInfo,
  handleMobileClick,
}) {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const [style, setStyle] = useState(false);


  useEffect(() => {
    if (location.pathname === "/savedarticles") {
      setStyle(true);
    } else {
      setStyle(false);
    }
  }, [location.pathname]);

  const handleSavedArticlesClick = () => {
    navigate("/savedarticles");
    toggleAboutInfo(true);
  };

  const handleHomeClick = () => {
    navigate("/");
    toggleAboutInfo(false);
  };

  return (
    <header className={style ? "header-black" : "header"}>
      <div className="header-container">
        <button
          onClick={handleMobileClick}
          className="header__mobile-menu-icon"
        >
          <img src={style ? menuIconBlack : menuIcon}></img>
        </button>
        <h1 className="header__title">NewsExplorer</h1>
        <div className="header__nav">
          <p
            onClick={handleHomeClick}
            className={
              style ? "header__home-button-black" : "header__home-button"
            }
          >
            Home
          </p>
          {!isLoggedIn && (
            <button
              onClick={handleSigninClick}
              className="header__signin-button"
            >
              Sign in
            </button>
          )}
          {isLoggedIn && (
            <>
              <p
                onClick={handleSavedArticlesClick}
                className={
                  style
                    ? "header__saved-articles-black"
                    : "header__saved-articles"
                }
              >
                Saved articles
              </p>
              <button
                className={
                  style
                    ? "header__profile-button-black"
                    : "header__profile-button"
                }
              >
                {currentUser.name}
                <img
                  className="header__profile-button-icon"
                  src={style ? ProfileIconBlack : ProfileIcon}
                  onClick={handleLogout}
                ></img>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
