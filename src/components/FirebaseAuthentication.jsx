import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../EventList.css";
import logo from '../assets/hobbies.png'

const FirebaseAuthentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError(""); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: email.split("@")[0],
      });
      const userName = auth.currentUser.displayName;
      alert(`User ${userName} signed up!`);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message); 
    }
  };

  const handleSignIn = async () => {
    setError(""); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      const userName = auth.currentUser.displayName;
      alert(`User ${userName} signed in!`);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login">
    <div className="black min-h-screen flex items-center justify-center">

      <div
        className="w-full sm:w-auto max-w-md p-6 sm:p-8 bg-white shadow-lg rounded-lg"
        aria-live="polite"
        aria-describedby="auth-description"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        <div className="logo-container">
          <img src={logo} width="400" height="300" atl="logo of brand hobbies"/>
          </div>
        </h2>
        <p id="auth-description" className="text-center text-gray-500 mb-8">
          Login or create an account to continue.
        </p>
        {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-required="true"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleSignUp}
            className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400"
            aria-label="Sign up for an account"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignIn}
            className="w-full sm:w-auto bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black"
            aria-label="Sign in to your account"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FirebaseAuthentication;
