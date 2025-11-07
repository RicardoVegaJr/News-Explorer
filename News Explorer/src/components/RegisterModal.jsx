import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "./FormValidator";

const SignupModal = ({ handleLogin, onClose, isOpen, activeModal, setActiveModal }) => {
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
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoginModal={true}
      activeModal={activeModal}
      setActiveModal={setActiveModal}
    >
      <label className="modal__form-title" htmlFor="email">
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

      <label className="modal__form-title" htmlFor="password">
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
        required
      ></input>

      <label className="modal__form-title" htmlFor="password">
        Username
      </label>
      <input
        className="modal__form-input"
        id="username"
        name="username"
        type="username"
        placeholder="Enter username"
        onChange={handleChange}
        value={values.username || ""}
        required
      ></input>
      {errors.email && <span className="modal__form-error">{errors.email}</span>}
      {errors.password && <span className="modal__form-error">{errors.password}</span>}
    </ModalWithForm>
  );
};

export default SignupModal;
