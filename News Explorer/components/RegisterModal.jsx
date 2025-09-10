import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const SignupModal = ({ handleLogin, onClose, isOpen, activeModal, setActiveModal }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
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
        value={data.email}
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
        value={data.password}
        required
      ></input>

      <label className="modal__form-input-title" htmlFor="password">
        Username
      </label>
      <input
        className="modal__form-input"
        id="username"
        name="username"
        type="username"
        placeholder="Enter username"
        onChange={handleChange}
        value={data.username}
        required
      ></input>
    </ModalWithForm>
  );
};

export default SignupModal;
