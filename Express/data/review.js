import db from '../db/database.js';

export async function getAll() {
  const res = await db.execute('SELECT * FROM Reviews');
  let reviewArr = [];

  if (res[0].length > 0) {
    for (const li of res[0]) {
      const [userResult] = await db.execute(
        'SELECT username FROM Users WHERE user_id = ?',
        [li.user_id]
      );
      const [productResult] = await db.execute(
        'SELECT name, imageUrl FROM Products WHERE product_id = ?',
        [li.product_id]
      );

      const userName = userResult.length > 0 ? userResult[0].username : null;
      const productName =
        productResult.length > 0 ? productResult[0].name : null;
      const productImg =
        productResult.length > 0 ? productResult[0].imageUrl : null;

      const data = {
        user_id: li.user_id,
        title: li.title,
        content: li.content,
        userImage: li.userImage,
        userName,
        rating: li.rating,
        product: { name: productName, imgUrl: productImg },
      };

      reviewArr.push(data);
    }
    return reviewArr;
  } else {
    return reviewArr;
  }
}

// 테스트 실행
getAll()
  .then((reviews) => console.log('Reviews:', reviews))
  .catch((error) => console.error('Error:', error));

export async function create(user_id, title, product_id, rating, content) {
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  return db
    .execute(
      'INSERT INTO Reviews (user_id, title, product_id, rating, content,created_at) VALUES (?,?,?,?,?,?)',
      [user_id, title, product_id, rating, content, created_at]
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
  return db.execute('DELETE Reviews WHERE review_id=?', [review_id]);
}
