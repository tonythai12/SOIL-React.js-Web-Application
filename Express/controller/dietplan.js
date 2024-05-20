import * as dietPlanRepository from '../data/dietplan.js';

export function getDietPlan(req, res, next) {
  const dietplans = dietPlanRepository.getAll();
  if (dietplans) {
    res.status(200).json(dietplans);
  } else {
    res.status(404).json({ message: 'Cannot get dietplans' });
  }
}

export function updateDietPlan(req, res, next) {
  const { eatingHabit, healthGoal } = req.body;
  const { user_id } = req.query;
  const updatedDietPlans = dietPlanRepository.create(
    user_id,
    eatingHabit,
    healthGoal
  );
  res.status(201).json(updatedDietPlans);
}
