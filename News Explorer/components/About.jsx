import AboutImage from "../src/assets/AboutImage.jpg";
import "../blocks/About.css";



function About(){

 return (
    <div className="about-container">
      <img src={AboutImage} className="about-container__image" alt="About Image" />
      <div className="about-container-text">
        <h1 className="about-container__description-header">About the author</h1>
      <p className="about-container__description">
        I am a multilingual full-stack developer with a strong background in Information Technology. I build robust web applications using JavaScript, React, Node.js, and MongoDB. My projects showcase my skills in integrating APIs and leveraging frameworks like GraphQL. My experience as a team lead highlights my ability to solve technical problems and lead others.
      </p>
      </div>
    </div>
  )
}
  export default About;