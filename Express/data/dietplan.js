import db from '../db/database.js';

// // get user's diet palnList
// export async function getAll() {
//   const [rows] = await db.execute('SELECT * FROM DietPlan');
//   if (rows.length === 0) {
//     return null; // Return null if no dietplan exists
//   } else {
//     return rows[0];
//   }
// }

export async function getByUserId(user_id) {
  const [rows] = await db.execute('SELECT * FROM DietPlan WHERE user_id=?', [
    user_id,
  ]);

  if (rows.length === 0) {
    return null;
  } else {
    // Array of promises for each dietPlan retrieval
    const userDietPlanPromises = rows.map(async (row) => {
      const [dietPlanRows] = await db.execute(
        'SELECT * FROM DietPlanList WHERE dietplanlist_id=?',
        [row.dietplanlist_id]
      );
      let dietPlan = dietPlanRows[0]; // Assuming there is only one result per dietplanlist_id
      // Parse products field from JSON string to array
      dietPlan.products = JSON.parse(dietPlan.products);
      return dietPlan;
    });

    // Wait for all promises to resolve
    const userDietPlanList = await Promise.all(userDietPlanPromises);

    return userDietPlanList;
  }
}

export async function create(user_id, eatingHabit, healthGoal) {
  // 1. get all dietplanlist
  const [dietPlan] = await db.execute('SELECT * FROM DietPlanList');
  if (dietPlan.length === 0) {
    return 'Cannot get dietplanlist';
  }

  // 2. filter by user's dietprofile info
  const relatedPlans = dietPlan.filter((plan) => {
    // Convert title and healthGoal to lowercase for comparison
    const lowerCaseTitle = plan.title.toLowerCase();
    return (
      lowerCaseTitle.includes(healthGoal.toLowerCase()) ||
      lowerCaseTitle.includes(eatingHabit.toLowerCase())
    );
  });

  // Set the found diet plan(s) to userData if available
  let updatedDietPlan;
  if (relatedPlans.length > 0 && relatedPlans.length < 2) {
    // When multiple related plans are found, set the first plan along with the first two default diet plans
    updatedDietPlan = [relatedPlans[0], ...dietPlan.slice(0, 2)];
  } else if (relatedPlans.length > 1) {
    // When more than one related plan is found, set the first two plans along with the first default diet plan
    updatedDietPlan = [
      relatedPlans[0],
      relatedPlans[1],
      ...dietPlan.slice(0, 1),
    ];
  } else {
    // When no related plans are found, set the first three default diet plans
    updatedDietPlan = dietPlan.slice(0, 3);
  }

  // get dietplanlist id
  const dietPlanListIds = updatedDietPlan.map((plan) => plan.dietplanlist_id);
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  // Function to save a single dietPlan to the database
  const saveDietPlan = async (user_id, dietplanlist_id, created_at) => {
    const result = await db.execute(
      'INSERT INTO DietPlan (user_id, dietplanlist_id, created_at) VALUES (?, ?, ?)',
      [user_id, dietplanlist_id, created_at]
    );
    return result[0];
  };

  // Array of promises for each insert operation
  const savePromises = dietPlanListIds.map((dietplanlist_id) =>
    saveDietPlan(user_id, dietplanlist_id, created_at)
  );

  // Execute all promises
  try {
    const results = await Promise.all(savePromises);
    if (results.length > 0) {
      const userDietPlan = await getByUserId(user_id);
      return userDietPlan;
    }
  } catch (error) {
    console.error('Error inserting diet plans:', error);
    throw error;
  }
}
