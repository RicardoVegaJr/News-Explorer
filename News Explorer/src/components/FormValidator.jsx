import { useState, useCallback } from "react";

export function useFormAndValidation(initialValues = {}) {

  const [values, setValues] = useState(initialValues);


  const [errors, setErrors] = useState({});

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage, form } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));    
    setErrors((prev) => ({ ...prev, [name]: validationMessage })); 
    setIsValid(form.checkValidity());                    
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, errors, isValid, handleChange, resetForm, setValues, setIsValid };
}