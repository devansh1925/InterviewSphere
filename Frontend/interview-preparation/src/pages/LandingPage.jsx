

import React, { useContext, useState } from 'react'
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu'
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const {user}=useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login");

  const handleCTA=()=>{
    if(!user){
      setOpenAuthModal(true);
    }
    else{
      navigate("/dashboard");
    }

  }

  return (
    <>
      {/* Bold, image-free hero */}
      <div
        className='w-full min-h-[70vh] relative overflow-hidden'
        style={{
          background:
            "radial-gradient(circle at 10% 10%, #fef3c7 0, rgba(254,243,199,0) 40%), radial-gradient(circle at 90% 0%, #dbeafe 0, rgba(219,234,254,0) 35%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        <div className='container mx-auto px-4 pt-6 pb-20 relative z-10'>
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-extrabold'>InterviewSphere 🌐</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:from-black hover:to-black transition-colors'
                onClick={() => setOpenAuthModal(true)}
              >
                Login/Sign Up
              </button>
            )}
          </header>

          <div className='max-w-4xl'>
            <div className='inline-flex items-center gap-2 text-[12px] text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200'>
              <LuSparkles /> Powered by AI
            </div>
            <h1 className='text-5xl md:text-6xl text-slate-900 font-extrabold tracking-tight mt-4'>
              Ace interviews with a
              <span className='ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#10b981]'>
                bold learning workflow
              </span>
            </h1>
            <p className='text-slate-600 text-lg mt-5 max-w-2xl'>
              Generate role-specific Q&A, go deeper when needed, and keep your prep organized. From first session to offer—own your journey.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <button
                className='bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:from-black hover:to-black transition-colors'
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature summary */}
      <div className='w-full bg-white'>
        <div className='container mx-auto px-4 py-16'>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10'>Everything you need to prepare with confidence</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className='rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white shadow-sm hover:shadow-md transition p-6'
              >
                <h3 className='text-base font-semibold text-slate-900 mb-2'>{feature.title}</h3>
                <p className='text-sm text-slate-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='text-sm bg-gray-50 text-secondary text-center p-5'>
        Boost Your Career  🎯
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage;