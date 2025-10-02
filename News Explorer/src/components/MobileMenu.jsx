import "../../blocks/MobileMenu.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MobileMenu({
  onClose,
  closeActiveModal,
  handleSigninClick,
  toggleAboutInfo,
  handleLogout
}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    closeActiveModal();
  };
  const {isLoggedIn } = useContext(CurrentUserContext);

  const handleSavedArticlesClick = () => {
    navigate("/savedarticles");
    toggleAboutInfo(true);
    closeActiveModal();
  };

  return (
    <div className="mobile__container">
      <div className="mobile__menu">
        <button type="button" onClick={onClose} className="mobile__modal__close" />
        <div className="mobile__menu-divider">
          <h1 className="mobile__title">NewsExplorer</h1>
        </div>
        <ul className="mobile__menu_list">
          <li onClick={handleHomeClick} className="mobile__menu-item">
            Home
          </li>
          {isLoggedIn && (
            <li onClick={handleSavedArticlesClick}> Save articles</li>
          )}
        </ul>
        {!isLoggedIn && (
          <button onClick={handleSigninClick} className="mobile__signin">
            Sign in
          </button>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="mobile__signin">
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
export default MobileMenu;
