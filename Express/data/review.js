import db from '../db/database.js';
import * as authRepository from './auth.js';

export async function getAll() {
  const res = await db.execute('SELECT * FROM Reviews');
  let reviewArr = [];

  if (res[0].length > 0) {
    for (const li of res[0]) {
      const [userResult] = await db.execute(
        'SELECT username FROM Users WHERE user_id=?',
        [li.user_id]
      );
      const [productResult] = await db.execute(
        'SELECT name, imageUrl FROM Products WHERE product_id=?',
        [li.product_id]
      );

      const userName = userResult.length > 0 ? userResult[0].username : null;
      const productName =
        productResult.length > 0 ? productResult[0].name : null;
      const productImg =
        productResult.length > 0 ? productResult[0].imageUrl : null;

      // get follow info
      const followInfo = await db.execute(
        'SELECT * FROM Following WHERE follower_id=? ',
        [li.user_id]
      );

      // get folling user info
      let followingUserInfos = [];
      for (const li of followInfo[0]) {
        const user = await authRepository.findById(li.following_id);
        followingUserInfos.push(user);
      }

      const data = {
        review_id: li.review_id,
        user_id: li.user_id,
        title: li.title,
        content: li.content,
        userImage: li.userImage,
        userName,
        followingUserInfos,
        rating: li.rating,
        product_id: li.product_id,
        product: { name: productName, imgUrl: productImg },
      };

      reviewArr.push(data);
    }
    return reviewArr;
  } else {
    return reviewArr;
  }
}

export async function geAllByRating(productId) {
  try {
    const [results] = await db.execute(
      `
      SELECT 
      Reviews.*, 
      Users.username
  FROM Reviews
  JOIN Users ON Reviews.user_id = Users.user_id
  WHERE Reviews.rating = 5 
      AND Reviews.product_id = ? 
      AND Reviews.product_id IN (SELECT product_id FROM Products);
    `,
      [productId]
    );
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // 에러 발생 시 예외를 던져 호출자가 이를 처리할 수 있도록 합니다.
  }
}

export async function create(user_id, title, product_id, rating, content) {
  return db
    .execute(
      'INSERT INTO Reviews (user_id, title, product_id, rating, content) VALUES (?,?,?,?,?)',
      [user_id, title, product_id, rating, content]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function edit(review_id, title, product_id, rating, content) {
  const query = `
      UPDATE Reviews 
      SET title = ?, product_id = ?, rating = ?, content = ?
      WHERE review_id = ?`;

  const [result] = await db.execute(query, [
    title,
    product_id,
    rating,
    content,
    review_id,
  ]);

  return result[0];
}

export async function remove(review_id) {
  try {
    const result = await db.execute('DELETE FROM Reviews WHERE review_id=?', [
      review_id,
    ]);
    return result;
  } catch (error) {
    console.error('Error deleting reviews:', error);
    throw error;
  }
}

export async function removeByUserId(user_id) {
  try {
    const result = await db.execute('DELETE FROM Reviews WHERE user_id=?', [
      user_id,
    ]);
    return result;
  } catch (error) {
    console.error('Error deleting reviews:', error);
    throw error;
  }
}

// follwing

export async function update(user_id, follower_id) {
  const checkFollower = await db.execute(
    'SELECT * FROM Following WHERE following_id=? AND follower_id=?',
    [user_id, follower_id]
  );

  if (checkFollower[0].length > 0) {
    return await db
      .execute('DELETE FROM Following WHERE following_id=? AND follower_id=?', [
        user_id,
        follower_id,
      ])
      .then((result) => {
        console.log(`delete result =>`, result);
        return result[0];
      });
  } else {
    return await db
      .execute(
        'INSERT INTO Following (following_id, follower_id) VALUES (?,?)',
        [user_id, follower_id]
      )
      .then((result) => {
        console.log(result[0]);
        return result[0];
      });
  }
}
