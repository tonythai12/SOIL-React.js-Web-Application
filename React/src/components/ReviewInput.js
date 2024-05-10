import React from 'react';

export default function ReviewInput({
  review,
  products,
  handleSave,
  selectedProduct,
  setSelectedProduct,
  editedReview,
  setEditedReview,
  selectedRating,
  setSelectedRating,
  setIsEditing,
}) {
  return (
    <div>
      <textarea
        className='border p-2 mb-2 w-full h-10 resize-none'
        value={editedReview.title}
        onChange={(e) =>
          setEditedReview({ ...editedReview, title: e.target.value })
        }
      ></textarea>
      <select
        className='border p-2 mb-2 w-full'
        value={selectedProduct}
        onChange={(e) => {
          return (
            setSelectedProduct(e.target.value),
            setEditedReview({
              ...editedReview,
              product: {
                ...editedReview.product,
                name: e.target.value,
                imgUrl: products.filter(
                  (product) => product.name === e.target.value
                )[0]?.imageUrl,
              },
            })
          );
        }}
      >
        <option>Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
            <img src={product.imageUrl} alt='' />
          </option>
        ))}
      </select>

      <select
        className='border p-2 mb-2 w-full'
        value={selectedRating}
        onChange={(e) => {
          return (
            setSelectedRating(e.target.value),
            setEditedReview({ ...editedReview, rating: e.target.value })
          );
        }}
      >
        <option value=''>Select a rating</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {Array(rating).fill('★').join('')}
          </option>
        ))}
      </select>
      <textarea
        className='border p-2 mb-2 w-full h-48 resize-none'
        value={editedReview.content}
        onChange={(e) =>
          setEditedReview({ ...editedReview, content: e.target.value })
        }
      ></textarea>
      <div className='flex justify-end'>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded mr-2'
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className='bg-gray-500 text-white px-4 py-2 rounded'
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
