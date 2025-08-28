import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';


import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = ({setCurrentPage}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();


  const handleLogin=async(e)=>{
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");




    try {
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token} =response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }



  };
  return <div className='w-[90vw] md:w-[36vw] p-7 md:p-8 bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm'>
    <div className='mb-6'>
      <div className='inline-flex items-center gap-2 text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200'>
        Secure Access
      </div>
      <h3 className='text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 leading-tight'>Sign in to your workspace</h3>
      <p className='text-[13px] text-slate-600 mt-2'>Enter your credentials to continue your interview preparation.</p>
    </div>

    <form onSubmit={handleLogin} className='space-y-4'>
      <Input
        value={email}
        onChange={({target})=>setEmail(target.value)}
        label="Email Address"
        placeholder="viren12@gmail.com"
        type="text"
      />

      <Input
        value={password}
        onChange={({target})=>setPassword(target.value)}
        label="Password"
        placeholder="Password"
        type="password"
      />

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type='submit' className='w-full h-11 rounded-xl bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-white font-semibold tracking-wide shadow-sm hover:shadow-md hover:from-black hover:to-black transition-colors'>
        Log in
      </button>

      <p className='text-[13px] text-slate-700 mt-3'>
        Don't have an account?{" "}
        <button 
          className='font-semibold text-indigo-600 hover:underline cursor-pointer'
          onClick={()=>{
            setCurrentPage("signup");
          }}
        >Create one
        </button>
        .
      </p>
      <div className='mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-500'>
        <div className='rounded-lg bg-white border border-slate-100 p-2.5'>
          Quick role-specific Q&A
        </div>
        <div className='rounded-lg bg-white border border-slate-100 p-2.5'>
          Save sessions and track progress
        </div>
      </div>
    </form>
    
  </div>
  

}

export default Login;








