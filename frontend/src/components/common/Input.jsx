function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
  readOnly = false,
  disabled = false,
  min,
  step,
  inputMode,
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
        readOnly={readOnly}
        disabled={disabled}
        min={min}
        step={step}
        inputMode={inputMode}
      />
    </div>
  );
}

export default Input;
