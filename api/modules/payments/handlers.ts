import paymentsServices from './services.ts';

async function getPaymentsByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const payments = await paymentsServices.getPaymentsByUserId(user_id);
    res.status(200).send(payments);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function addPaymentByUserId(req, res) {
  const { name, card_number, card_type, exp_date, cvv, zip_code, user_id } = req.body.params;

  try {
    const paymentId = await paymentsServices.addPaymentByUserId(
      user_id,
      name,
      card_number,
      card_type,
      exp_date,
      cvv,
      zip_code
    );
    res.status(200).send(paymentId);
  } catch (err) {
    console.log('controllers', err);
    res.status(404).send(err);
  }
}

export default {
  getPaymentsByUserId,
  addPaymentByUserId,
}