// Updated Login Component with Firestore functionality

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googlePic from '../../assets/img/google.svg';
import loginImg from '../../assets/img/LoginImg.jpg';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/config';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  // Function to store/update user data in Firestore
  const updateUserFirestore = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If the user does not exist in Firestore, create a new entry
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
        role: 'user' // Default role for all users
      });
    } else {
      // If user exists, update necessary fields (you can modify this as needed)
      await setDoc(userRef, {
        email: user.email,
      }, { merge: true });
    }
  };

  // Function for login with email and password
  const LoginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Update or create the user data in Firestore
        await updateUserFirestore(user);

        setLoading(false);
        toast.success('Login Successful');
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  // Function for Google login
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // Update or create the user data in Firestore
        await updateUserFirestore(user);

        setLoading(false);
        toast.success('Login Successful');
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <section>
        {loading && (
          <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
            <SpinnerDotted />
          </div>
        )}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* Left side */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Welcome back</span>
              <span className="font-light text-gray-400 mb-8">
                Welcome back! Please enter your details
              </span>
              <form onSubmit={LoginUser}>
                <div className="py-4">
                  <label htmlFor="email" className="mb-2 text-md block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    name="email"
                    id="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="py-4">
                  <label htmlFor="password" className="mb-2 text-md block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-between w-full py-4">
                  <div className="mr-24">
                    <input type="checkbox" name="ch" id="ch" className="mr-2" />
                    <label htmlFor="ch" className="text-md">
                      Remember me
                    </label>
                  </div>
                  <Link to="/reset">
                    <span className="font-bold text-md">Forgot password</span>
                  </Link>
                </div>
                <button type='submit' className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-accent hover:text-white hover:border hover:border-gray-300">
                  Sign in
                </button>
              </form>
              <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-accent hover:text-white" onClick={loginWithGoogle}>
                <img src={googlePic} alt="Google" className="w-6 h-6 inline mr-2" />
                Sign in with Google
              </button>
              <div className="text-center text-gray-400">
                <Link to="/register">
                  Don’t have an account?{" "}
                  <span className="font-bold text-accent">Sign up for free</span>
                </Link>
              </div>
            </div>
            {/* Right side */}
            <div className="relative">
              <img
                src={loginImg}
                alt="Display"
                className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              />
              {/* Text on image */}
              <div className="absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                <span className="text-white text-xl">
                  Welcome to Mzansi Stays! Discover your perfect stay effortlessly and enjoy exclusive deals!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
