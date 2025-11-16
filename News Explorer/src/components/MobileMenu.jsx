import "../../blocks/MobileMenu.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MobileMenu({
  onClose,
  closeActiveModal,
  handleSigninClick,
  toggleAboutInfo,
  handleLogout,
}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    closeActiveModal();
  };
  const { isLoggedIn } = useContext(CurrentUserContext);

  const handleSavedArticlesClick = () => {
    navigate("/savedarticles");
    toggleAboutInfo(true);
    closeActiveModal();
  };

  return (
    <section className="mobile">
      <div className="mobile__menu">
        <button type="button" onClick={onClose} className="mobile__close" />
        <div className="mobile__divider">
          <h1 className="mobile__title">NewsExplorer</h1>
        </div>
        <ul className="mobile__list">
          <li onClick={handleHomeClick} className="mobile__item">
            Home
          </li>
          {isLoggedIn && (
            <li
              className="mobile__item"
              onClick={handleSavedArticlesClick}
            >
              {" "}
              Saved articles
            </li>
          )}
        </ul>
        {!isLoggedIn && (
          <button onClick={handleSigninClick} className="mobile__button">
            Sign in
          </button>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="mobile__button">
            Sign out
          </button>
        )}
      </div>
    </section>
  );
}
export default MobileMenu;
