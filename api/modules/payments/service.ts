import { Knex } from 'knex';
import { Service, Inject } from 'typedi';
import { PaymentDTO } from './dto';
import { Payment } from './types';
import PaymentsMapper from './mapper';

export interface PaymentsService {
  getPayments(user_id?: number): Promise<PaymentDTO[]>;
  addPayment(
    user_id: string,
    name: string,
    card_number: number,
    card_type: string,
    exp_date: string,
    cvv: number,
    zip_code: number
  ): Promise<number[]>;
}

@Service()
export class PaymentsServiceImpl implements PaymentsService {
  constructor(
    @Inject('DATABASE_ACCESS')
    private db: Knex
  ) {}

  getPayments = async (user_id?: number): Promise<PaymentDTO[]> => {
    const payments: Payment[] = await this.db('payment_info').where((qb) => {
      if (user_id) {
        qb.where({ user_id });
      }
    });
    const paymentsDTO: PaymentDTO[] = PaymentsMapper.toPaymentsDTO(payments);
    return paymentsDTO;
  };

  addPayment = async (
    user_id: string,
    name: string,
    card_number: number,
    card_type: string,
    exp_date: string,
    cvv: number,
    zip_code: number
  ): Promise<number[]> => {
    const insertedId = await this.db('payment_info').insert(
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
    return PaymentsMapper.toInsertedPaymentIdDTO(insertedId);
  };
}
