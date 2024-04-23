import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitUserLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const url = "http://localhost:5000/api/account/login";
      const response = await axios.post(url, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data.message);

      if (response.data.success === true) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log("Error logging in. \nERROR : ", error.message);
    }
  };

  return (
    <div className="w-1/3 h-3/4 mx-auto flex flex-col my-20 p-12 border rounded-lg border-gray-400 text-lg">
      <div className="text-4xl font-bold mb-6 text-center">Login</div>
      <form
        id="login"
        className="flex flex-col justify-center h-3/5 gap-12"
        onSubmit={submitUserLogin}
      >
        <div className="flex flex-col gap-2">
          Email
          <input
            className="p-2 text-base border rounded"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          Password
          <input
            className="p-2 text-base border rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {/* Changed type to 'password' */}
        </div>
      </form>
      <button
        form="login"
        className="bg-blue-500 text-white font-bold py-3 px-20 rounded self-center mt-4 hover:bg-blue-600 transition duration-200"
        type="submit"
      >
        Login
      </button>
      <Link
        className="mt-5 text-center text-blue-500 hover:underline"
        to="/signup"
      >
        Create new account
      </Link>
    </div>
  );
};

export default Login;
