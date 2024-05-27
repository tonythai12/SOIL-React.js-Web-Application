import * as dietPlanRepository from '../data/dietplan.js';

export function getDietPlanList(req, res) {
  const dietplanList = dietPlanRepository.getAll();
  if (dietplanList) {
    res.status(200).json(dietplanList);
  } else {
    res.status(404).json({ message: 'Cannot get dietplanList' });
  }
}

export function getDietPlan(req, res) {
  const { user_id } = req.params;
  const dietplans = dietPlanRepository.getByUserId(user_id);
  if (dietplans) {
    res.status(200).json(dietplans);
  } else {
    res.status(404).json({ message: 'Cannot get dietplans' });
  }
}

export function updateDietPlan(req, res) {
  const { eatingHabit, healthGoal } = req.body;
  const { user_id } = req.params;
  const updatedDietPlans = dietPlanRepository.create(
    user_id,
    eatingHabit,
    healthGoal
  );
  if (updatedDietPlans) {
    res.status(201).json(updatedDietPlans);
  } else {
    res.status(404).json({ message: 'User Profile has not been submitted' });
  }
}
