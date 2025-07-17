'use client';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '@/firebase';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the icons
import notFound from '@/public/notFound.png';

interface User {
  name: string;
  email: string;
  password?: string;
  photoURL?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loginMethod, setLoginMethod] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const method = localStorage.getItem('loginMethod');
    setLoginMethod(method);

    if (method === 'google') {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser({
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
        });
      }
    } else if (method === 'normal') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.email && parsed?.name) {
            setUser({
              name: parsed.name,
              email: parsed.email,
              password: parsed.password,
            });
          }
        } catch {
          console.error('Invalid user data in localStorage');
        }
      }
    }
  }, []);

  // Function to handle showing/hiding user info
  const handleShowInfo = () => {
    if (name1 === "" && email1 === "" && password1 === "") {
      if (loginMethod === 'google' && user) {
        setName1(`Name: ${user.name}`);
        setEmail1(`Email: ${user.email}`);
        setPassword1(""); // No password for Google users
      } else if (loginMethod === 'normal' && user) {
        setName1(`Name: ${user.name}`);
        setEmail1(`Email: ${user.email}`);
        setPassword1(showPassword ? (user.password || '') as string : '••••••••');
      }
    } else {
      setName1("");
      setEmail1("");
      setPassword1("");
      setShowPassword(false);
    }
    setShowInfo(!showInfo); // Toggle showInfo state
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    if (loginMethod === 'normal' && user && user.password) {
      setShowPassword(!showPassword);
      setPassword1(`${!showPassword ? (user.password || '') as string : '••••••••'}`);
    }
  };

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth).finally(() => {
      localStorage.clear();
      router.push('/login');
    });
  };

  const login = () => {
    router.push('/login')
  }

  const signup = () => {
    router.push('/signup')
  }

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
    }
  }, [user]);

  if (!user) {
    if (!showContent) {
      // Display loading message during the 2-second delay
      return (
        <div className='bg-[rgba(248,247,244,255)] h-screen flex justify-center items-center'>
          <p className='text-black'>Loading...</p>
        </div>
      );
    } else {
      // After the 2-second delay, check loginMethod to render specific messages
      if (loginMethod === 'normal') {
        return (
          <div className='bg-[rgba(248,247,244,255)] h-screen'>
            <div className='flex justify-center items-center'>
              <img className='mt-10' src={notFound.src} alt='404 UnAuthorized' />
            </div>
            <div className='flex justify-center items-center'>
              <div className='text-center text-black'>
                <p>User Is Either Not Logged In Or Is Required To Login Again!</p>
                <div>
                  <div onClick={login} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Login? </div>
                  <div className='text-black inline'>Or </div>
                  <div onClick={signup} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Signup?</div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (loginMethod === 'google') {
        return (
          <div className='bg-[rgba(248,247,244,255)] h-screen'>
            <div className='flex justify-center items-center'>
              <img className='mt-10' src={notFound.src} alt="404 UnAuthorized"/>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-center text-black">
                <p>Your Google session has expired or you need to log in.</p> {/* Updated message for Google */}
                <div>
                  <div onClick={login} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Login? </div>
                  <div className='text-black inline'>Or </div>
                  <div onClick={signup} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Signup?</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      // Fallback if loginMethod is not 'normal' or 'google' but user is null
      return (
        <div className='bg-[rgba(248,247,244,255)] h-screen'>
          <div className='flex justify-center items-center'>
            <img className='mt-10' src={notFound.src} alt="404 UnAuthorized"/>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-center text-black">
              <p>User session expired or not logged in.</p>
              <div>
                <div onClick={login} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Login? </div>
                <div className='text-black inline'>Or </div>
                <div onClick={signup} className='cursor-pointer text-blue-300 hover:text-blue-200 inline'>Signup?</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-0 m-0">
      <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
        {loginMethod === 'google' ? (
          <div className="relative cursor-pointer">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full relative z-10 border-2 border-black object-cover animate-pulse-custom min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] p-0 m-0 block overflow-hidden"
                onClick={handleShowInfo}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-xl cursor-pointer">
                {user.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
        ) : (
          <div className="relative cursor-pointer">
            <span
              className="py-2 px-4 bg-white rounded-full text-black font-semibold transition-all duration-300 ease-in-out shadow-md hover:bg-black hover:text-white"
              onClick={handleShowInfo}
            >
              {user.name}
            </span>
          </div>
        )}
      </div>

      <main className="pt-16">
        <h1 className="text-center text-black text-4xl mt-16 mb-8 font-bold">Welcome {user.name}</h1>
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md">
          {name1 && <h3 className="text-gray-700 my-4 p-4 rounded-lg bg-[#e2f8f0] transition-all duration-300 ease-in-out hover:translate-x-2 hover:bg-[#a6e1e7]">{name1}</h3>}
          {email1 && <h3 className="text-gray-700 my-4 p-4 rounded-lg bg-[#e2f8f0] transition-all duration-300 ease-in-out hover:translate-x-2 hover:bg-[#a6e1e7]">{email1}</h3>}
          {password1 && (
            <div className="flex items-center gap-2 bg-[#e2f8f0] p-4 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2 hover:bg-[#a6e1e7]">
              <span className="text-gray-700 font-bold text-lg">Password:</span>
              {loginMethod === 'normal' && (
                <button
                  onClick={togglePasswordVisibility}
                  className="p-0 border-none bg-transparent cursor-pointer flex items-center text-gray-700 hover:text-[#2f9bda]"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              )}
              <h3 className="m-0 p-0 bg-transparent text-gray-700">{password1}</h3>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full mt-5">
          <button
            className="btn btn-outline btn-wide btn-error "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </main>

      {/* Tailwind CSS keyframes for custom animation */}
      <style jsx global>{`
        @keyframes pulse-custom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
