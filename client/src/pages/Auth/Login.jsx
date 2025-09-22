import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json", // ✅ required for JSON
          },
        }
      );

      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      // Navigate based on role
      if (res.data.user.role === "admin") {
        navigate("/admin_dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

      console.log("Logged in user:", res.data.user);
      console.log("Token:", res.data.token);
    } catch (err) {
      console.error(err); // ✅ always log the error
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-lightText/20"
      >
        <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-lightText/30 focus:ring-2 focus:ring-secondary rounded-md p-3 mb-4 w-full font-paragraph text-neutralText"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-lightText/30 focus:ring-2 focus:ring-secondary rounded-md p-3 mb-4 w-full font-paragraph text-neutralText"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Role Dropdown */}
        <select
          className="border border-lightText/30 focus:ring-2 focus:ring-secondary rounded-md p-3 mb-6 w-full font-paragraph text-neutralText"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-md w-full font-heading font-semibold transition">
          Login
        </button>

        {/* 👇 Signup Redirect */}
        <p className="text-center text-sm text-neutralText mt-4">
          Not a user?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-secondary font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
