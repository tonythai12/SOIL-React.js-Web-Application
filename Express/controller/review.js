import * as reviewRepository from '../data/review.js';

// get all Reviews
export async function getReviews(req, res) {
  const reviews = await reviewRepository.getAll();
  if (reviews.length > 0) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ message: 'Cannot get reviews' });
  }
}

// create Reviews
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

// edit revies
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

// delete reviews
export function deleteReviews(req, res) {
  const { review_id } = req.params;
  const deleted = reviewRepository.remove(review_id);
  res.status(204).json(deleted);
}

// update followers in reviewList
export function updateFollowings(req, res) {
  const { user_id } = req.params;
  const { follower_id } = req.body;
  const updated = reviewRepository.update(user_id, follower_id);
  res.status(201).json(updated);
}
