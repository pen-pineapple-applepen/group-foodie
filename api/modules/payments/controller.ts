import { Request, Response } from 'express';
import { Service } from 'typedi';
import { PaymentsServiceImpl } from './service';

export interface PaymentsController {
  getPayments(req: Request, res: Response): Promise<void>;
  addPayment(req: Request, res: Response): Promise<void>;
}

@Service()
export class PaymentsControllerImpl implements PaymentsController {
  constructor(private readonly paymentsService: PaymentsServiceImpl) {}

  getPayments = async (req: Request, res: Response): Promise<void> => {
    const user_id = req.query.user_id || undefined;
    try {
      const payments = await this.paymentsService.getPayments(Number(user_id));
      res.status(200).send(payments);
    } catch (err) {
      res.status(404).send(err);
    }
  }

  addPayment = async (req: Request, res: Response) => {
    const { name, card_number, card_type, exp_date, cvv, zip_code, user_id } = req.body;

    try {
      const paymentId = await this.paymentsService.addPayment(
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
}
