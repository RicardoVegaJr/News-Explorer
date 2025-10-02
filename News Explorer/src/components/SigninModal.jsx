import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "./FormValidator";

const LoginModal = ({ handleLogin, onClose, isOpen, activeModal, setActiveModal }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    handleLogin(values);
    resetForm(); 
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoginModal={true}
      activeModal={activeModal}
      setActiveModal={setActiveModal}
    >
      <label className="modal__form-input-title" htmlFor="email">
        Email
      </label>
      <input
        className="modal__form-input"
        id="email"
        name="email"
        type="email"
        placeholder="Enter email"
        onChange={handleChange}
        value={values.email || ""}
        required
      ></input>
      <label className="modal__form-input-title" htmlFor="password">
        Password
      </label>
      <input
        className="modal__form-input"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={handleChange}
        value={values.password || ""}
        minLength="6"
        required
      ></input>
      {errors.email && <span className="modal__form-error">{errors.email}</span>}
      {errors.password && <span className="modal__form-error">{errors.password}</span>}
    </ModalWithForm>
  );
};

export default LoginModal;
