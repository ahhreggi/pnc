import PropTypes from "prop-types";

const About = (props) => {
  About.propTypes = {
    onClose: PropTypes.func,
  };
  return (
    <div className="About">
      <h2>About</h2>
      <h3>Made by Maria Regina Sirilan</h3>
      <h3 className="settings-toggle close" onClick={() => props.onClose(false)}>close</h3>
    </div>
  );

};

export default About;