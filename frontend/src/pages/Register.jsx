import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
        
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account 🚀
        </h2>

        <input 
          name="name" 
          placeholder="Name"
          onChange={handleChange} 
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input 
          name="email" 
          placeholder="Email"
          onChange={handleChange} 
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input 
          name="password" 
          type="password" 
          placeholder="Password"
          onChange={handleChange} 
          className="w-full mb-6 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
          Register
        </button>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account? 
          <span onClick={() => navigate("/")} className="text-blue-400 cursor-pointer ml-1">
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;