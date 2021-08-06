export interface Order {
  id: number;
  user_id: number;
  food: string;
  quantity: number;
  price: number;
  date: string;
  food_id: number;
  group_id: number;
  restaurant_id: number;
  live: boolean;
}