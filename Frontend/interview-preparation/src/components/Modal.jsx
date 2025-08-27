import React, { Children } from 'react'

const Modal = ({children,isOpen, onClose, title,hideHeader}) => {

  if (!isOpen) return null;
  
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>

       <div 
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}
      >
        {!hideHeader && (
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
          </div>
        )}

        <button 
          type='button' 
          className='absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer transition-colors shadow-sm' 
          onClick={onClose}
        >
          <svg className='w-4 h-4' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox='0 0 24 24'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'/>
          </svg>
        </button>

        <div className='flex-1 overflow-y-auto custom-scrollbar '>
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default Modal;