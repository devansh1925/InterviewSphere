import React from 'react'

const DeleteAlertConent = ({content,onDelete}) => {
  return (
    <div className='p-5'>
      <p className='test-[14px]'>{content}</p>

      <div className='flex justify-end mt-6'>
        <button
        type="button"
        className='btn-small'
        onClick={onDelete}
        >
          Delete
        </button>

      </div>
    </div>
  )
}

export default DeleteAlertConent