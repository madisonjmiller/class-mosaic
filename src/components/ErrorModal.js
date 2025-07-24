import './ErrorModal.css'; // Create a CSS file to style the modal

const ErrorModal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="error-modal-overlay">
      <div className="error-modal-content">
        <button className="error-modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="error-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;