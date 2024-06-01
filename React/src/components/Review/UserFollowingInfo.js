import React from 'react';

export default function UserFollowingInfo({ review, setOpenDialog }) {
  console.log(review.followingUserInfos);
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96 relative'>
        <h2 className='text-3xl font-bold text-center mb-4'>
          {review?.userName}
        </h2>
        <img
          className='w-32 h-32 rounded-full mx-auto mb-4'
          src={review?.userImage}
          alt={review?.userName}
        />
        <div className='text-center'>
          <h3 className='text-xl font-semibold mb-2'>Purchased Products</h3>
          <h2>{review?.product?.name}</h2>
          <div className='border rounded-md border-red-400 mt-2 pb-2'>
            <h3 className='text-xl font-semibold mb-2 mt-2 text-red-500'>
              ❤️ Followers : {review?.followingUserInfos.length} ❤️
            </h3>
            <ul>
              {review?.followingUserInfos.map((follower, index) => (
                <li key={index} className='text-lg inline-block'>
                  {follower?.username} ,
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={() => setOpenDialog(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
