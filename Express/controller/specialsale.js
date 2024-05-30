import * as SpecialSaleRepository from '../data/specialsale.js';

export async function getSaleProducts(req, res) {
  const saleProducts = await SpecialSaleRepository.getAll();
  res.status(201).json(saleProducts);
}

export async function getPreference(req, res) {
  const { user_id } = req.params;
  const preference = await SpecialSaleRepository.get(user_id);
  res.status(201).json(preference);
}

export async function updatePreference(req, res) {
  const { product_name } = req.body;
  const { user_id } = req.query;
  const updatedPreference = await SpecialSaleRepository.create(
    user_id,
    product_name
  );
  res.status(201).json(updatedPreference);
}
