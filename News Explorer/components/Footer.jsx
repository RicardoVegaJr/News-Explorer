import "../blocks/Footer.css";
import GitIcon from "../src/assets/GitIcon.svg";
import FBIcon from "../src/assets/FBIcon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Supersite, Powered by News API</p>
      <div className="footer__nav">
        <ul className="footer__links">
          <li className="footer__home">Home</li>
          <li className="footer__tripleten">TripleTen</li>
        </ul>
        <div className="footer__icons">
          <img src={GitIcon} className="footer__icon-button"></img>
          <img src={FBIcon}className="footer__icon-button"></img>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
