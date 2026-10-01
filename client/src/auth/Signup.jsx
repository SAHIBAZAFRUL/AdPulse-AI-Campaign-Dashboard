import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Registration Successful!");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-[420px] space-y-4 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;