import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const ProfileInfoCard = () => {
  const {user,clearUser,updateUser}=useContext(UserContext);
  const navigate=useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading,setIsUploading]=useState(false);

  const handleLogout=()=>{
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const onAvatarClick = () => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try{
      setIsUploading(true);
      const { imageUrl } = await uploadImage(file);
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE_IMAGE, { imageUrl });
      if (response?.data) {
        updateUser(response.data);
      }
    }catch(err){
      console.error('Failed to upload avatar', err);
    }finally{
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Default avatar SVG when no profile image
  const DefaultAvatar = () => (
    <div className="w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center border border-slate-200">
      <svg className="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  );

    return (
      user &&(
        <div className="flex items-center">
          <button onClick={onAvatarClick} className="mr-3 relative rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="avatar"
                onError={(e)=>{ e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                className="w-11 h-11 bg-gray-200 rounded-full object-cover"
              />
            ) : null}
            <DefaultAvatar />
            {isUploading && <span className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </span>}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div>
            <div
              className="text-[15px] text-black font-bold leading-3"
            >
              {user.name || ""}
            </div>
            <button
              className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )
    )




}

export default ProfileInfoCard