import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // ✅ yahan hona chahiye

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/home"); // 🔥 redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back 👋
        </h2>

        <input 
          name="email" 
          placeholder="Email"
          onChange={handleChange} 
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
        />

        <input 
          name="password" 
          type="password" 
          placeholder="Password"
          onChange={handleChange} 
          className="w-full mb-6 p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account? 
          <span 
            onClick={() => navigate("/register")} 
            className="text-blue-400 cursor-pointer ml-1"
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}

export default Login;