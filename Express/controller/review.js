import * as reviewRepository from '../data/review.js';

export async function getReviews(req, res) {
  const reviews = await reviewRepository.getAll();
  console.log(reviews);
  if (reviews.length > 0) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ message: 'Cannot get reviews' });
  }
}

export function createReviews(req, res) {
  const { user_id, title, product_id, rating, content } = req.body;
  const review = reviewRepository.create(
    user_id,
    title,
    product_id,
    rating,
    content
  );
  if (review) {
    res.status(201).json(review);
  } else {
    res.status(404).json({ message: 'it is not successfully created' });
  }
}

export function editReviews(req, res) {
  const { review_id } = req.params;
  const { title, product_id, rating, content } = req.body;
  const review = reviewRepository.edit(
    review_id,
    title,
    product_id,
    rating,
    content
  );
  res.status(200).json(review);
}

export function deleteReviews(req, res) {
  const { review_id } = req.params;
  const deleted = reviewRepository.remove(review_id);
  res.status(204).json(deleted);
}
