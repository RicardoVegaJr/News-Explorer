import "../../blocks/Footer.css";
import GitIcon from "../assets/GitIcon.svg";
import FBIcon from "../assets/FBIcon.svg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const setPath = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <p className="footer__copyright">© 2025 Supersite, Powered by News API</p>
      <div className="footer__nav">
        <ul className="footer__links">
          <li onClick={setPath} className="footer__home">
            Home
          </li>
          <li className="footer__tripleten">
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__tripleten-link"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <div className="footer__icons">
          <a
            href="https://github.com/RicardoVegaJr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GitIcon} className="footer__icon-button"></img>
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FBIcon} className="footer__icon-button"></img>
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
