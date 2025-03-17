import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ensureAuthenticated } from '../store/auth.store';

function LoginPage() {

  const {isAuthenticated} = ensureAuthenticated();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/',{replace : true});
  }
  },[isAuthenticated]);

  return (
    <div className="bg-[url('/images/codioful-formerly-gradienta-OzfD79w8ptA-unsplash.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
      <div className="p-6 max-w-md rounded-lg shadow-md shadow-black text-center flex flex-col items-center justify-center">
        <div className='flex flex-col items-center gap-4'>
          <h1 className="text-2xl font-bold text-white">Hello there...</h1>
          <h2 className="text-xl text-white font-mono">This is Grievance Redressal Portal</h2>
          <h3 className="text-lg text-gray-200">Please login to access the portal</h3>
        </div>
        <div className="mt-6">
          <a
            href="http://localhost:1000/api/login/auth/google"
            className="max-w-fit flex items-center justify-evenly gap-2 px-4 py-2 border rounded-lg shadow-md bg-white hover:bg-gray-800 active:bg-gray-300 focus:ring focus:ring-gray-300 transition"
          >
            <img
              src="https://www.shareicon.net/download/2015/10/04/111650_google-icon_512x512.png"
              className="w-6 h-6"
              alt="Google Logo"
              loading="lazy"
            />
            <span>Continue with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
