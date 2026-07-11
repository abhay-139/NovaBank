function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <input
        className="form-control input-box"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default Input;