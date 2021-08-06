import { PaymentDTO } from './dto';
import { Payment } from './types';

export default class PaymentsMapper {
  public static toPaymentDTO(payment: Payment): PaymentDTO {
    return {
      id: payment.id,
      name: payment.name,
      card_number: payment.card_number,
      card_type: payment.card_type,
      exp_date: payment.exp_date,
      cvv: payment.cvv,
      zip_code: payment.zip_code,
      user_id: payment.user_id,
    };
  }

  public static toPaymentsDTO(payments: Payment[]): PaymentDTO[] {
    return payments.map((payment) => {
      return this.toPaymentDTO(payment);
    });
  }

  public static toInsertedPaymentIdDTO(insertedId: number[]): number[] {
    return insertedId;
  }
}