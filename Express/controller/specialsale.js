import * as SpecialSaleRepository from '../data/specialsale.js';

export function updatePreference(req, res, next) {
  const { product_name } = req.body;
  const { user_id } = req.query;
  const updatedPreference = SpecialSaleRepository.create(user_id, product_name);
  res.status(201).json(updatedPreference);
}
