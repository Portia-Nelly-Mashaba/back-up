import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googlePic from '../../assets/img/google.svg';
import displayImg from '../../assets/img/image.jpg';
import { SpinnerDotted } from 'spinners-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const RegisterUser = (e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            toast.error('Passwords do not match');
        }

        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    setLoading(false);
    toast.success('Registration Successful')
    navigate('/login')
  })
  .catch((error) => {
    toast.error(error.message);
    setLoading(false);
  });
    }
  return (
    <>
    <ToastContainer />
      <section>
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted />
        </div>
        )}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* left side */}
            <div className="relative rounded-l-2xl">
              <img
                src={displayImg}
                alt="Display"
                className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
              />
              {/* Text on image */}
              <div className="absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                <span className="text-white text-xl">
                  Welcome to Mzansi Stays! Discover your perfect stay effortlessly and enjoy exclusive deals!
                </span>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col justify-center p-8 md:p-14 rounded-r-2xl">
              <span className="mb-3 text-4xl font-bold">Register</span>
              <span className="font-light text-gray-400 mb-4">
                Welcome to Mzansi Stays App! Please enter your details
              </span>
              <form onSubmit={RegisterUser}>
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
                  <label htmlFor="password" className="mb-2 mt-0 text-md block">
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
                <div className="py-4">
                  <label htmlFor="password" className="mb-2 text-md block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmpassword"
                    id="confirmpassword"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                <button type='submit' className="w-full bg-black text-white p-2 rounded-lg mt-4 mb-8 hover:bg-accent hover:text-white hover:border hover:border-gray-300">
                  Register
                </button>
                <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-accent hover:text-white">
                  <img src={googlePic} alt="Google" className="w-6 h-6 inline mr-2" />
                  Register with Google
                </button>
                <div className="text-center text-gray-400">
                  <Link to="/login">
                    Already have an account?{" "}
                    <span className="font-bold text-accent">Login</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
