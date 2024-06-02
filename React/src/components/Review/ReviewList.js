import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import UserFollowingInfo from './UserFollowingInfo';

export default function ReviewList({
  reviews,
  userData,
  httpClient,
  getReviews,
  handleViewDetail,
  setIsCreate,
}) {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [selectedReview, setSelectedReview] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCreate = () => {
    // only for user signed and logged in
    if (!userData?.email) {
      alert('This is a members-only page. You can access it after logging in');
    } else {
      setIsCreate(true);
    }
  };

  const toggleFollow = async (userName, follower_id) => {
    const res = await httpClient.fetch(`/soil/review/${userData?.user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        follower_id,
      }),
    });
    if (res.status !== 201) {
      return alert(res.message);
    } else {
      // UI
      setFollowedUsers((prev) => {
        if (prev.includes(userName)) {
          alert(`You unfollowed ${userName}`);
          return prev.filter((user) => user !== userName);
        } else {
          alert(`You are following ${userName}`);
          return [...prev, userName];
        }
      });
      // get reviews again
      getReviews();
    }
  };

  return (
    <div className='pb-7'>
      {reviews && reviews.length === 0 ? (
        <div className='flex items-center justify-center mt-40 h-screen'>
          <p className='text-3xl text-gray-600 font-semibold'>
            No reviews have been written yet
          </p>
        </div>
      ) : (
        <div className='max-w-4xl mx-auto p-4'>
          <div className='text-center mt-7 mb-7'>
            <h2 className='text-3xl text-white font-bold'>SOIL purchases!</h2>
            <h3 className='text-2xl text-green-500 pt-1'>
              Thank you so much for your heartfelt review 😊
            </h3>
          </div>
          <div className='grid gap-4'>
            {reviews &&
              reviews.map((review, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg shadow-md bg-white bg-opacity-20 hover:bg-opacity-10 cursor-pointer flex items-center`}
                >
                  {/* When inappropriate review is removed by admin */}
                  {review?.blocked && (
                    <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xl z-10'>
                      <p>**** This review has been deleted by the admin ***</p>
                    </div>
                  )}

                  <div className={`flex ${review?.blocked ? 'blur-sm' : ''}`}>
                    {/* User image and name */}
                    <div
                      onClick={() => {
                        if (!review.deleted) {
                          setOpenDialog(true);
                          setSelectedReview(review);
                        }
                      }}
                      className='mr-4 w-20 flex flex-col justify-center items-center'
                    >
                      <img
                        className='w-15 h-15 rounded-full'
                        src='/img/user_default_icon.png'
                        alt={review?.userName}
                      />
                      <p className='text-gray-200 mt-1'>{review?.userName}</p>
                      <p className='text-gray-200 mt-1'>⇡</p>
                      <p className='text-gray-200 mt-1'>Click</p>
                    </div>
                    {/* Products reviews */}
                    <div className='flex flex-col justify-center mt-3'>
                      <h2 className='text-xl text-white font-semibold mb-2'>
                        {review?.title}
                      </h2>
                      <p className='text-orange-300 mt-2 border rounded-md border-orange-300 p-1 pr-2 pl-2'>
                        {review?.product?.name}
                      </p>
                      <p className='text-white mt-2'>{review?.content}</p>
                      <Rating rating={review?.rating} />
                      <div className='flex items-center mt-4'>
                        <button
                          className='bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition duration-300 mr-2'
                          onClick={() => handleViewDetail(index)}
                          disabled={review.deleted}
                        >
                          View Detail
                        </button>
                        {review?.user_id !== userData?.user_id && (
                          <button
                            className='focus:outline-none transition duration-300 text-red-500'
                            onClick={() =>
                              !review.deleted &&
                              toggleFollow(review?.userName, review?.user_id)
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill={review?.heart ? 'currentColor' : 'none'}
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='2'
                              width='24'
                              height='24'
                            >
                              <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {openDialog && (
              <UserFollowingInfo
                review={selectedReview}
                setOpenDialog={setOpenDialog}
              />
            )}
            {userData?.user_id && (
              <button
                className='w-40 bg-green-500 hover:bg-green-600 text-white mt-5 px-4 py-2 rounded-md transition duration-300 self-end justify-self-end'
                onClick={handleCreate}
              >
                Create Review
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
