import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { register } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await register({
        fullName,
        email,
        password,
        role: "CUSTOMER",
      });

      toast.success(response);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
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
              Open Your Bank Account
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
              Register
            </h2>

            <form onSubmit={handleRegister}>

              <Input
  label="Full Name"
  type="text"
  name="fullName"
  placeholder="Enter your full name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  autoComplete="name"
/>
              <Input
  label="Email"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="email"
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
                title={loading ? "Registering..." : "Register"}
                type="submit"
                disabled={loading}
              />

            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;