import React from 'react';
import Rating from './Rating';

export default function ReviewList({
  reviews,
  userData,
  handleViewDetail,
  setIsCreate,
}) {
  const handleCreate = () => {
    // only for user signed and logged in
    if (!userData?.email) {
      alert('This is a members-only page. You can access it after logging in');
    } else {
      setIsCreate(true);
    }
  };

  return (
    <div className='pb-7 h-full'>
      <div className='max-w-4xl mx-auto p-4'>
        <div className='text-center mt-7 mb-7'>
          <h2 className='text-3xl text-white font-bold'>SOIL purchases!</h2>
          <h3 className='text-2xl text-green-500  pt-1'>
            Thank you so much for your heartfelt review 😊
          </h3>
        </div>
        <div className='grid gap-4'>
          {reviews.map((review, index) => (
            <div
              key={index}
              className='p-4 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-10 cursor-pointer flex items-center'
            >
              <div className='mr-4 w-20 flex flex-col justify-center items-center'>
                <img
                  className=' w-15 h-15 rounded-full'
                  src='/img/user_default_icon.png'
                  alt={review?.userName}
                />
                <p className='text-gray-200 mt-1'>{review?.userName}</p>
              </div>
              <div className='flex flex-col justify-center mt-3'>
                <h2 className='text-xl text-white font-semibold mb-2'>
                  {review?.title}
                </h2>
                <p className='text-white mt-2'>{review?.content}</p>
                <Rating rating={review?.rating} />
                <button
                  className='self-start mt-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition duration-300'
                  onClick={() => handleViewDetail(index)}
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
          <button
            className='w-40 bg-green-500 hover:bg-green-600 text-white mt-5 px-4 py-2 rounded-md transition duration-300 self-end justify-self-end'
            onClick={() => handleCreate()}
          >
            Create Review
          </button>
        </div>
      </div>
    </div>
  );
}
