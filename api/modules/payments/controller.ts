import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { PaymentsServiceImpl } from './service';

export interface PaymentsController {
  getPayments(req: Request, res: Response, next: NextFunction): Promise<void>;
  addPayment(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@Service()
export class PaymentsControllerImpl implements PaymentsController {
  constructor(private readonly paymentsService: PaymentsServiceImpl) {}

  getPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user_id = req.query.user_id || undefined;
    try {
      const payments = await this.paymentsService.getPayments(Number(user_id));
      res.status(200).send(payments);
    } catch (err) {
      next(err);
    }
  }

  addPayment = async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
}
