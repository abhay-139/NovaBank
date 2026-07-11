function Button({
  title,
  type = "button",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className="btn btn-primary w-100 mt-3"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;