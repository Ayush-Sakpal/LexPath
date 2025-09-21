import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin_dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      alert(err.res.data.message);
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
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-lightText/30 focus:ring-2 focus:ring-secondary rounded-md p-3 mb-4 w-full font-paragraph text-neutralText"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Role Dropdown */}
        <select
          className="border border-lightText/30 focus:ring-2 focus:ring-secondary rounded-md p-3 mb-6 w-full font-paragraph text-neutralText"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-md w-full font-heading font-semibold transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
