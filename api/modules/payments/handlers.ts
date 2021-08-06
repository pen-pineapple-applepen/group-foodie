import { Request, Response } from 'express';
import paymentsServices from './services';

async function getPaymentsByUserId(req: Request, res: Response) {
  const { user_id } = req.params;
  try {
    const payments = await paymentsServices.getPaymentsByUserId(Number(user_id));
    res.status(200).send(payments);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function addPaymentByUserId(req: Request, res: Response) {
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