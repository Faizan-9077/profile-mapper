import PropTypes from "prop-types";

export default function ErrorMessage({ message = "An error occurred!" }) {
  return (
    <div className="error-message">
      <p>⚠️ {message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
