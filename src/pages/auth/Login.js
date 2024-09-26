import React from 'react';
import { Link } from 'react-router-dom';
import googlePic from '../../assets/img/google.svg';
import displayImg from '../../assets/img/image.jpg';

const Login = () => {
  return (
    <>
      <section>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* Left side */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Welcome back</span>
              <span className="font-light text-gray-400 mb-8">
                Welcome back! Please enter your details
              </span>
              <form>
                <div className="py-4">
                  <label htmlFor="email" className="mb-2 text-md block">
                    Email
                  </label>
                  <input
                    type="email"
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
                <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-accent hover:text-white hover:border hover:border-gray-300">
                  Sign in
                </button>
                <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-accent hover:text-white">
                  <img src={googlePic} alt="Google" className="w-6 h-6 inline mr-2" />
                  Sign in with Google
                </button>
                <div className="text-center text-gray-400">
                <Link to="/register">
                  Don’t have an account?{" "}
                  <span className="font-bold text-black">Sign up for free</span>
                  </Link>
                </div>
              </form>
            </div>
            {/* Right side */}
            <div className="relative">
              <img
                src={displayImg}
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
