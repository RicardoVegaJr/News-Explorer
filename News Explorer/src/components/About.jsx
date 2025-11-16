import AboutImage from "../assets/AboutImage.jpg";
import "../../blocks/About.css";

function About() {
  return (
    <section className="about">
      <img
        src={AboutImage}
        className="about__image"
        alt="Author Image"
      />
      <div className="about__text">
        <h1 className="about__description">
          About the author
        </h1>
        <p className="about__description-text">
          I am a multilingual full-stack developer with a strong background in
          Information Technology. I build robust web applications using
          JavaScript, React, Node.js, and MongoDB. My projects showcase my
          skills in integrating APIs and leveraging frameworks like GraphQL. My
          experience as a team lead highlights my ability to solve technical
          problems and lead others.
        </p>
      </div>
    </section>
  );
}
export default About;
