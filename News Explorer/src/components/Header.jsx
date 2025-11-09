import "../../blocks/Header.css";
import ProfileIcon from "../assets/ProfileImageIcon.svg";
import ProfileIconBlack from "../assets/ProfileImageIconBlack.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import menuIcon from "../assets/menuIcon.svg";
import menuIconBlack from "../assets/menuIconBlack.svg";

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

  const headerTitleMarginClass = isLoggedIn
    ? "header__title--signed-in"
    : "header__title--signed-out";

  const headerHomeMarginClass = isLoggedIn
    ? "header__home--signed-in"
    : "header__home--signed-out";

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
    <header className={`header ${style ? "header--black" : ""}`}>
      <div className="header__container">
        <button
          onClick={handleMobileClick}
          className="header__mobile-menu-icon"
        >
          <img
            src={style ? menuIconBlack : menuIcon}
            alt="Mobile menu icon"
          ></img>
        </button>
        <h1 className={`header__title ${headerTitleMarginClass}`}>
          NewsExplorer
        </h1>
        <div className="header__nav">
          <p
            onClick={handleHomeClick}
            className={`header__home-button ${
              style ? "header__home-button--black" : ""
            } ${headerHomeMarginClass}`}
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
                className={`header__saved-articles ${
                  style ? "header__saved-articles--black" : ""
                }`}
              >
                Saved articles
              </p>
              <button
                className={`header__profile-button ${
                  style ? "header__profile-button--black" : ""
                }`}
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
