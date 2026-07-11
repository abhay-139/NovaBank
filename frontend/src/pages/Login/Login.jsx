import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

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
        <div className="col-md-6 d-none d-md-flex bg-primary text-white justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="display-3 fw-bold">NovaBank</h1>

            <h3 className="mt-4">
              Secure Digital Banking
            </h3>

            <p className="mt-3 fs-5">
              Fast • Safe • Trusted
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">

          <div
            className="card shadow-lg p-5"
            style={{ width: "420px", borderRadius: "20px" }}
          >

           <h2 className="text-center mb-4">
  Welcome Back
</h2>

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

<Input
  label="Password"
  type="password"
  name="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="new-password"
/>

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