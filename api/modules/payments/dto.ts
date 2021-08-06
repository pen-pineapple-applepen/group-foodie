export interface PaymentDTO {
  id: number;
  name: string;
  card_number: number;
  card_type: string;
  exp_date: string;
  cvv: number;
  zip_code: number;
  user_id: number;
}
