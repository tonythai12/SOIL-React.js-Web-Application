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
      console.log(`saleProducts =>`, saleProducts);
      console.log(`products =>`, products);
      const resultObject = saleProducts.reduce((acc, sale) => {
        const specialArr = products.filter((product) =>
          product.name.includes(sale.product_name)
        );

        console.log(`Special products for ${sale.product_name}:`, specialArr); // Debugging line

        acc[sale.product_name] = {
          tips: sale.tip,
          specials: specialArr,
          imageUrl: sale.imageUrl,
        };
        return acc;
      }, {});
      console.log(JSON.stringify(resultObject, null, 2));
      return JSON.stringify(resultObject, null, 2);
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
