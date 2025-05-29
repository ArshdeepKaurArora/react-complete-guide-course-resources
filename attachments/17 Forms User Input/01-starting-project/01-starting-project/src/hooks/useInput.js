import { useState } from "react";

export function useInput() {
  const [formData, setFormData] = useState("");
  const [didEdit, setDidEdit] = useState(false);

  const handleChange = (formValue) => {
    setFormData(formValue);
    setDidEdit(false);
  };

  const handleBlur = () => {
    setDidEdit(true);
  };

  return {
    formData,
    didEdit,
    handleChange,
    handleBlur,
  };
}
