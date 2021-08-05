import restaurants from './restaurants';
import menus from './menus';

interface FormattedRestaurant {
  restaurant_id: number;
  name: string;
  street: string;
  cuisines: string[];
  hours: string;
}

interface MenuItem {
  menu_item_id: number;
  menu_item_name: string;
  menu_item_description: string;
  menu_item_pricing: number;
  menu_category: string;
}

interface MenuData {
  restaurant_id: number;
  menu_items: MenuItem[];
}

interface Restaurant {
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

/**
 * Due to demonstration purposes of this application, restaurant and menu data are mocked
 * with hardcoded data
 */

const getRestaurantsByZipCode = async (zip_code: number) => {
  const restaurantsData: Restaurant[] = restaurants.restaurants;

  const allRestaurants = restaurantsData.reduce((acc, restaurant) => {
    const formattedRestaurant = {} as FormattedRestaurant;
    formattedRestaurant.restaurant_id = restaurant.restaurant_id;
    formattedRestaurant.name = restaurant.restaurant_name;
    formattedRestaurant.street = restaurant.address.formatted;
    formattedRestaurant.cuisines = [restaurant.cuisines];
    formattedRestaurant.hours = restaurant.hours;
    acc.push(formattedRestaurant)
    return acc;
  }, [] as FormattedRestaurant[])
  return allRestaurants;
}

const getMenuByRestaurantId = async (restaurant_id: number) => {
  const menusData: MenuData[] = menus.menus;
  const currentRestaurant = menusData.find(menu => menu.restaurant_id === Number(restaurant_id));
  let menuItems: MenuItem[];
  if (currentRestaurant) {
    menuItems = currentRestaurant.menu_items;
  } else {
    throw new Error('current restaurant does not exist');
  }

  return menuItems;
}

export default {
  getRestaurantsByZipCode,
  getMenuByRestaurantId,
}