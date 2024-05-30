import db from '../db/database.js';

export async function getAll() {
  try {
    // get SpecialSale
    const [saleProducts] = await db.execute('SELECT * FROM SpecialSale');

    if (saleProducts.length > 0) {
      // get products
      const productIds = saleProducts.map((sale) => sale.product_id);
      const products = await Promise.all(
        productIds.map(async (id) => {
          const [res] = await db.execute(
            'SELECT * FROM Products WHERE product_id=? AND isSale=true',
            [id]
          );
          return res[0];
        })
      );
      const resultObject = saleProducts.reduce((acc, sale) => {
        const specialArr = products.filter((product) =>
          product.name.includes(sale.product_name)
        );
        acc[sale.product_name] = {
          tips: sale.tip,
          specials: specialArr,
          imageUrl: sale.imageUrl,
        };
        return acc;
      }, {});

      return JSON.stringify(resultObject, null, 2);
    }
  } catch (error) {
    console.error('Error fetching special sales and products:', error);
    throw error;
  }
}

export async function get(user_id) {
  return db
    .execute('SELECT * FROM Preference WHERE user_id=?', [user_id])
    .then((result) => {
      return result[0];
    });
}

export async function create(user_id, product_name) {
  return db
    .execute('INSERT INTO Preference (user_id, product_name) VALUES (?,?)', [
      user_id,
      product_name,
    ])
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function remove(user_id) {
  try {
    const result = await db.execute('DELETE FROM Preference WHERE user_id=?', [
      user_id,
    ]);
    return result;
  } catch (error) {
    console.error('Faile to change preference:', error);
    throw error;
  }
}
