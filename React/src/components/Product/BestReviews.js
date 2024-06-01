import React from 'react';
import Rating from '../Review/Rating';
export default function BestReviews({ bestReviews }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-center py-4 bg-yellow-400 rounded-t-lg'>
          ⭐️ Best Reviews ⭐️
        </h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2'>Username</th>
                <th className='px-4 py-2'>Title</th>
                <th className='px-4 py-2'>Content</th>
                <th className='px-4 py-2'>Rating</th>
              </tr>
            </thead>
            <tbody>
              {bestReviews &&
                bestReviews.map((review, index) => (
                  <tr key={index}>
                    <td className='border px-4 py-2'>
                      <div className='flex items-center'>
                        {review?.userImage && (
                          <img
                            src={review.userImage}
                            alt={review.username}
                            className='w-10 h-10 rounded-full mr-2'
                          />
                        )}
                        <span className='font-semibold'>
                          {review?.username}
                        </span>
                      </div>
                    </td>
                    <td className='border px-4 py-2'>{review?.title}</td>
                    <td className='border px-4 py-2'>{review?.content}</td>
                    <td className='border px-4 py-2'>
                      <Rating rating={review?.rating} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
