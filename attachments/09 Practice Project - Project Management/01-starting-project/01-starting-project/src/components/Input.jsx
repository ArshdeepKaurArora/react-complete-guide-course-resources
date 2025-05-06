import React from "react";

const Input = ({ type, label, handleChange, ...props }) => {
  return (
    <>
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...props} onChange={handleChange} />
      ) : (
        <input type={type} {...props} onChange={handleChange} />
      )}
    </>
  );
};

export default Input;
