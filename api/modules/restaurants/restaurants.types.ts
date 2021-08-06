export interface MenuItem {
  menu_item_id: number;
  menu_item_name: string;
  menu_item_description: string;
  menu_item_pricing: number;
  menu_category: string;
}

export interface MenuData {
  restaurant_id: number;
  menu_items: MenuItem[];
}

export interface Restaurant {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_phone: string;
  restaurant_website: string;
  hours: string;
  cuisines: string;
  address: {
    city: string;
    state: string;
    postal_code: string;
    street: string;
    formatted: string;
  };
}