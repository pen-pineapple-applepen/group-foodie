import { Knex } from 'knex';
import { Service, Inject } from 'typedi';
import { PaymentDTO } from './dto';
import { Payment } from './types';
import PaymentsMapper from './mapper';

export interface PaymentsService {
  getPaymentsByUserId(user_id: number): Promise<PaymentDTO[]>;
  addPaymentByUserId(
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

  getPaymentsByUserId = async (user_id: number): Promise<PaymentDTO[]> => {
    const payments: Payment[] = await this.db('payment_info').where({ user_id });
    const paymentsDTO: PaymentDTO[] = PaymentsMapper.toPaymentsDTO(payments);
    return paymentsDTO;
  };

  addPaymentByUserId = async (
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
  }
}
