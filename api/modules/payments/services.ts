import db from '../../db';

const getPaymentsByUserId = async (user_id: number) => {
  const payments = await db('payment_info').where({ user_id: user_id });
  return payments;
};

const addPaymentByUserId = async (
  user_id: string,
  name: string,
  card_number: number,
  card_type: string,
  exp_date: string,
  cvv: number,
  zip_code: number
) => {
  const insertedId = await db('payment_info').insert(
    {
      name,
      card_number,
      card_type,
      exp_date,
      cvv,
      zip_code,
      user_id,
    },
    'id'
  );
  return insertedId;
};

export default {
  getPaymentsByUserId,
  addPaymentByUserId,
};
