import React from 'react';
import Rating from './Rating';

export default function ReviewInfo({ review, rating, setIsEditing, onDelete }) {
  return (
    <div className='h-900 text-white flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold mb-5'>{review?.title}</h1>
      <img className='w-full' src={review?.product?.imgUrl} alt='' />
      <div className='mt-5'>
        <Rating rating={rating} width={'w-10'} />
      </div>
      <p className=' pt-5 pb-5 text-lg break-all'>{review?.content}</p>
      <div className='flex self-end'>
        <button
          className='bg-yellow-500 text-white px-4 py-2 mt-2 rounded'
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
