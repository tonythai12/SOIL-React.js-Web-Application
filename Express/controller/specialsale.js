import * as SpecialSaleRepository from '../data/specialsale.js';

export function getPreference(req, res) {
  const { user_id } = req.params;
  const preference = SpecialSaleRepository.get(user_id);
  res.status(201).json(preference);
}

export function updatePreference(req, res) {
  const { product_name } = req.body;
  const { user_id } = req.query;
  const updatedPreference = SpecialSaleRepository.create(user_id, product_name);
  res.status(201).json(updatedPreference);
}
