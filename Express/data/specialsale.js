import db from '../db/database.js';

export async function getAll() {
  try {
    // get SpecialSale
    const [saleProducts] = await db.execute('SELECT * FROM SpecialSale');

    if (saleProducts.length > 0) {
      // get products
      const productIds = saleProducts.map((res) => res.product.id);
      const products = await Promise.all(
        productIds.map(async (id) => {
          const [res] = await db.execute(
            'SELECT * FROM Products WHERE product_id=?',
            [id]
          );
          return res[0];
        })
      );

      const resultObject = saleProducts.reduce((acc, sale) => {
        const specialArr = products.filter((product) =>
          sale.product_name.includes(product.name)
        );

        acc[sale.product_name] = {
          tips: sale.tip,
          specials: specialArr,
          imageUrl: sale.imageUrl,
        };

        return acc;
      }, {});

      return resultObject;
    }
  } catch (error) {
    console.error('Error fetching special sales and products:', error);
    throw error;
  }
}

export async function get(user_id) {
  return db
    .execute('SELECT * FROM Preference WHERE user_id=? VALUES (?)', [user_id])
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function create(user_id, product_name) {
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  return db
    .execute(
      'INSERT INTO Preference (user_id, product_name ,created_at) VALUES (?,?,?)',
      [user_id, product_name, created_at]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}
