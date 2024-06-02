import * as dietPlanRepository from '../data/dietplan.js';

// export async function getDietPlanList(req, res) {
//   const dietplanList = await dietPlanRepository.getAll();
//   if (dietplanList) {
//     res.status(200).json(dietplanList);
//   } else {
//     res.status(404).json({ message: 'Cannot get dietplanList' });
//   }
// }

export async function getDietPlan(req, res) {
  const { user_id } = req.params;
  const dietplans = await dietPlanRepository.getByUserId(user_id);
  if (dietplans) {
    res.status(200).json(dietplans);
  } else {
    res.status(404).json({ message: 'Cannot get dietplans' });
  }
}

export async function updateDietPlan(req, res) {
  const { eatingHabit, healthGoal } = req.body;
  const { user_id } = req.params;
  try {
    const updatedDietPlans = await dietPlanRepository.create(
      user_id,
      eatingHabit,
      healthGoal
    );

    if (updatedDietPlans && updatedDietPlans.length > 0) {
      res.status(201).json(updatedDietPlans);
    } else {
      res.status(404).json({ message: 'User Profile has not been submitted' });
    }
  } catch (error) {
    console.error('Error updating diet plans:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
