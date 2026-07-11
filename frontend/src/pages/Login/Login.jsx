import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUniversity } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await login(email, password);

    localStorage.setItem("token", response.token);

setEmail("");
setPassword("");

toast.success(response.message);

navigate("/dashboard");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* Left Side */}
        <div
  className="col-md-6 d-none d-md-flex text-white justify-content-center align-items-center"
  style={{
    background: "linear-gradient(135deg,#2563EB,#1E40AF)"
  }}
>
          <div className="text-center">
            <h1 className="display-3 fw-bold">
  NovaBank
</h1>

<h3 className="mt-4">
  Secure Digital Banking
</h3>

<p className="mt-3 fs-5">
  Your money. Your control.
</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">

         <div
  className="auth-card"
  style={{ width: "430px" }}
>

           <div className="text-center mb-4">

    <FaUniversity
        size={55}
        color="#2563EB"
    />

    <h2 className="page-title text-center mt-3">
  Welcome Back
</h2>

<p className="page-subtitle text-center mb-4">
  Login to continue
</p>

</div>

<form onSubmit={handleLogin} autoComplete="off">

<Input
  label="Email"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="off"
/>

<div className="mb-4">
  <label className="form-label fw-semibold">
    Password
  </label>

  <div className="input-group">

    <span className="input-group-text">
      <FaLock />
    </span>

    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="new-password"
      style={{ height: "50px" }}
    />

    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

  </div>
</div>

<Button
  title={loading ? "Logging in..." : "Login"}
  type="submit"
  disabled={loading}
/>
</form>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;