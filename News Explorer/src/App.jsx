import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import Main from "../src/components/Main";
import Footer from "../src/components/Footer";
import LoginModal from "../src/components/SigninModal";
import SignupModal from "../src/components/RegisterModal";
import SavedArticles from "../src/components/SavedArticles";
import MobileMenu from "../src/components/MobileMenu";
import { authorize } from "../utils/Auth";
import { searchArticles } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { checkToken } from "../utils/Auth";

function App() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
  });
  const [searchQuery, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aboutInfo, toggleAboutinfo] = useState(false);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem("savedArticles");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSavedArticle = (article, keyword) => {
    const articleWithKeyword = { ...article, keyword };
    setSavedArticles((prev) => {
      const updated = [articleWithKeyword, ...prev];
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev) => {
      const updated = prev.filter((a) => a.title !== article.title);
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = async ({ searchQuery }) => {
    setIsLoading(true);
    setSearchInitiated(true);
    setSearchKeyword(searchQuery);
    try {
      const data = await searchArticles(searchQuery);
      setTimeout(() => {
        setArticles(data.articles);
        setIsLoading(false);
        console.log("Articles set:", data.articles);
      }, 1500);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setIsLoading(false);
    }
  };

  const handleSigninClick = () => {
    setActiveModal("signinModal");
    console.log("Sign in Test Complete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    console.log("Close Modal Test Complete");
  };

  const handleMobileClick = () => {
    setActiveModal("mobileMenu");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      console.log("Login: Email or password missing.");
      setIsLoggedIn(false);
      return;
    }
    return authorize(email, password)
      .then((data) => {
        console.log("Login successful, received token:", data.token);
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((res) => {
        console.log("Token verified:", res);
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error during login authorization:", err);
        setIsLoggedIn(false);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "" });
    closeActiveModal();
    navigate("/");
    toggleAboutinfo(false);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <Header
          handleSigninClick={handleSigninClick}
          handleLogout={handleLogout}
          toggleAboutInfo={toggleAboutinfo}
          handleMobileClick={handleMobileClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchKeyword={setSearchKeyword}
                savedArticles={savedArticles}
                handleSavedArticle={handleSavedArticle}
                handleRemoveArticle={handleRemoveArticle}
                isLoading={isLoading}
                articles={articles}
                searchInitiated={searchInitiated}
                aboutInfo={aboutInfo}
              >
                {" "}
              </Main>
            }
          />
          <Route
            path="/savedarticles"
            element={
              <SavedArticles
                searchQuery={searchQuery}
                savedArticles={savedArticles}
                handleRemoveArticle={handleRemoveArticle}
              />
            }
          />
        </Routes>
        <Footer />
        {activeModal === "signinModal" && (
          <LoginModal
            isOpen={activeModal === "signinModal"}
            onClose={closeActiveModal}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleLogin={handleLogin}
          />
        )}
        {activeModal === "signupModal" && (
          <SignupModal
            isOpen={activeModal === "signupModal"}
            onClose={closeActiveModal}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleLogin={handleLogin}
          />
        )}
        {activeModal === "mobileMenu" && (
          <MobileMenu
            isOpen={activeModal === "mobileMenu"}
            onClose={closeActiveModal}
            closeActiveModal={closeActiveModal}
            handleSigninClick={handleSigninClick}
            toggleAboutInfo={toggleAboutinfo}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
