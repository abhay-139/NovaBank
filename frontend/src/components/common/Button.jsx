function Button({
  title,
  type = "button",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="btn primary-btn w-100 mt-3"
    >
      {title}
    </button>
  );
}

export default Button;