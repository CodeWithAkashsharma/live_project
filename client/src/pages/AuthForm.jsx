// src/pages/AuthForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // use axios instance with interceptor
import AuthContext from "../context/AuthContext";

export default function AuthForm() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext); // use context to manage login

  const [isLogin, setIsLogin] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !password || (!isLogin && !fullname)) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    setBusy(true);
    try {
      if (isLogin) {
        // LOGIN
        const res = await axiosInstance.post("/auth/login", { email, password });
        const { token, user } = res.data;

        if (!token || !user) throw new Error("Invalid login response");

        // Update AuthContext (handles localStorage internally)
        loginUser(user, token);

        setMessage({ type: "success", text: "Login successful — redirecting..." });

        // Navigate based on role
        setTimeout(() => {
          switch (user.role) {
            case "admin":
              navigate("/admin");
              break;
            case "superadmin":
              navigate("/superadmin");
              break;
            default:
              navigate("/user");
          }
        }, 300);

      } else {
        // REGISTER
        await axiosInstance.post("/auth/register", { fullname, email, password });
        setMessage({ type: "success", text: "Registration successful. Please login." });
        resetForm();
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      const text = err.response?.data?.message || err.message || "Server error";
      setMessage({ type: "error", text });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">{isLogin ? "Sign in" : "Create account"}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {isLogin ? "Enter credentials to login." : "Fill details to register."}
        </p>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-2 mb-4 bg-gray-100 rounded p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded ${isLogin ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
            disabled={busy}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded ${!isLogin ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
            disabled={busy}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required={!isLogin}
                className="mt-1 block w-full border px-3 py-2 rounded"
                placeholder="Your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border px-3 py-2 rounded"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border px-3 py-2 rounded"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={busy}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {busy ? (isLogin ? "Signing in..." : "Registering...") : isLogin ? "Sign in" : "Create account"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={busy}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
