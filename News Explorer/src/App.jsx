import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import About from "../components/About";
import LoginModal from "../components/SigninModal";
import SignupModal from "../components/RegisterModal";
import SavedArticles from "../components/SavedArticles";
import { authorize } from "../utils/Auth";
import SearchResults from "../components/SearchResults";
import { searchArticles } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aboutInfo, toggleAboutinfo] = useState(false);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem("savedArticles");
    return stored ? JSON.parse(stored) : [];
  });




   const handleSavedArticle = (article) => {
    setSavedArticles((prev) => {
      const updated = [article, ...prev];
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev ) => {
      const updated = prev.filter((a) => a.title !== article.title);
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    })
  }

  localStorage.clear();

  const handleSearch = async ({ search }) => {
    setIsLoading(true);
    setSearchInitiated(true);

    try {
      const data = await searchArticles(search);
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

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      console.log("Login: Email or password missing.");
      setIsLoggedIn(false);
      return;
    }
    return authorize(email, password)
      .then((data) => {
        console.log("Login successful, received token:", data.token);
        setIsLoggedIn(true);
        setCurrentUser({ name: "User" });
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
          />
          <Routes>
            <Route path="/" element={<Main handleSearch={handleSearch} />} />
            <Route path="/savedarticles" element={<SavedArticles  savedArticles={savedArticles} handleRemoveArticle={handleRemoveArticle} />} />
          </Routes>
          {searchInitiated && location.pathname !== "/savedarticles" && (
            <SearchResults  savedArticles={savedArticles} handleSavedArticle={handleSavedArticle} handleRemoveArticle={handleRemoveArticle} isLoading={isLoading} articles={articles} />
          )}
          {!aboutInfo  && <About /> }
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
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    
  );
}

export default App;
