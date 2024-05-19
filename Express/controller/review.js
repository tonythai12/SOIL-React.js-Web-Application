import * as reviewRepository from '../data/review.js';

export function getReviews(req, res, next) {
  const reviews = reviewRepository.getAll();
  if (reviews) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ message: 'Cannot get reviews' });
  }
}

export function createReviews(req, res, next) {
  const { user_id, title, product_id, rating, content } = req.body;
  const review = reviewRepository.create(
    user_id,
    title,
    product_id,
    rating,
    content
  );
  res.status(201).json(review);
}

export function editReviews(req, res, next) {
  const { review_id } = req.query;
  const { title, product_id, rating, content } = res.body;
  const review = reviewRepository.edit(
    review_id,
    title,
    product_id,
    rating,
    content
  );
  res.status(200).json(review);
}

export function deleteReviews(req, res, next) {
  const { review_id } = req.query;
  reviewRepository.remove(review_id);
  res.status(204);
}
