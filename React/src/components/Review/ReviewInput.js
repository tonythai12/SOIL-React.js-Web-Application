import React from 'react';

export default function ReviewInput({
  products,
  handleSave,
  selectedProduct,
  setSelectedProduct,
  editedReview,
  setEditedReview,
  setSelectedReviewIndex,
  selectedRating,
  setSelectedRating,
  setIsEditing,
  isCreate,
  setIsCreate,
}) {
  return (
    <div>
      <textarea
        className='border p-2 mb-2 w-full h-10 resize-none'
        value={editedReview.title}
        placeholder='Title'
        onChange={(e) =>
          setEditedReview({
            ...editedReview,
            title: e.target.value,
          })
        }
      ></textarea>
      <select
        className='border p-2 mb-2 w-full'
        value={selectedProduct}
        onChange={(e) => {
          const selectedProduct = products.find(
            (product) => product.name === e.target.value
          );
          return (
            setSelectedProduct(selectedProduct.name),
            setEditedReview({
              ...editedReview,
              product_id: selectedProduct.product_id,
              product: {
                name: selectedProduct.name,
                imgUrl: selectedProduct.imageUrl,
              },
            })
          );
        }}
      >
        <option>Select a product</option>
        {products.map((product, index) => (
          <option key={index} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <select
        className='border p-2 mb-2 w-full'
        value={selectedRating}
        onChange={(e) => {
          return (
            setSelectedRating(e.target.value),
            setEditedReview({
              ...editedReview,
              rating: e.target.value,
            })
          );
        }}
      >
        <option value=''>Select a rating</option>
        {[1, 2, 3, 4, 5].map((rating, index) => (
          <option key={index} value={rating}>
            {Array(rating).fill('★').join('')}
          </option>
        ))}
      </select>
      <textarea
        className='border p-2 mb-2 w-full h-48 resize-none'
        value={editedReview.content}
        maxlength='100'
        placeholder='Write up to 100 characters...'
        onChange={(e) =>
          setEditedReview({
            ...editedReview,
            content: e.target.value,
          })
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
          onClick={() => {
            if (!isCreate) {
              setIsEditing(false);
            } else {
              setSelectedReviewIndex(null);
              setIsCreate(false);
            }
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
