import db from '../../db';

const getPaymentsByUserId = async (user_id) => {
  const payments = await db('payment_info')
    .where({ user_id: user_id })
  return payments;
}

const addPaymentByUserId = async (
  user_id, name, card_number, card_type, exp_date, cvv, zip_code
) => {
  const insertedId = await db('payment_info')
    .insert({
      name,
      card_number,
      card_type,
      exp_date,
      cvv,
      zip_code,
      user_id,
    }, 'id')
  return insertedId;
}

export default {
  getPaymentsByUserId,
  addPaymentByUserId,
}