import React from 'react';

export default function Rating({ rating, width }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span key={i} className={`text-yellow-500 ${width}`}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className={`text-gray-400 ${width}`}>
          ★
        </span>
      );
    }
  }
  return <div className='flex mt-1'>{stars}</div>;
}
