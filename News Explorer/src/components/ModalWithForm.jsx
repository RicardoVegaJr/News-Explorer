import "../../blocks/ModalWithForm.css";

function ModalWithForm({ onSubmit, isOpen, onClose, title, buttonText, children, activeModal, setActiveModal }) {
  return (
    <div className={`modal ${isOpen ? "modal--opened" : ""}`}>
      <div className="modal__container">
        <button type="button" onClick={onClose} className="modal__close" />
        <form onSubmit={onSubmit} action="" className="modal__form">
          <h1 className="modal__form-title">{title}</h1>
          {children}
          <div className="modal__form-wrapper">
            <button type="submit" className="modal__form_submit-button">
              {buttonText}
            </button>
            {activeModal === "signinModal" && (
            <button onClick={() => setActiveModal("signupModal")} className="modal__form_login"> or Sign up</button>
            )}
            {activeModal === "signupModal" && (
            <button onClick={() => setActiveModal("signinModal")} className="modal__form_login"> or Sign in</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
