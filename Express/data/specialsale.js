import db from '../db/database.js';

export async function getAll() {
  // get SpecialSale
  const [saleProducts] = db.execute('SELECT * FROM SpecialSale');

  if (saleProducts.length > 0) {
    // get products
    const productIds = saleProducts.map((res) => res.product.id);
    const products = productIds.map((ids) => {
      const res = db.execute(
        'SELECT * FROM Products WHERE product_id=? VALUES (?)',
        [ids]
      );
      return res[0];
    });

    // const resultArr = saleProducts[0].map((sale) => {
    //   const specialArr = products.filter((product) =>
    //     sale.product_name.includes(product.name)
    //   );

    //   return {
    //     [sale.product_name]: {
    //       tips: sale.tip,
    //       specials: specialArr,
    //       imageUrl: sale.imageUrl,
    //     },
    //   };
    // });

    const resultObject = saleProducts[0].reduce((acc, sale) => {
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
