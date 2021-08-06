import { FormattedRestaurant, MenuItem, MenuData, Restaurant } from './restaurants.types';
import { FormattedRestaurantDTO, MenuItemDTO, MenuDataDTO, RestaurantDTO } from './dto';

export default class RestaurantsMapper {
  public static toRestaurantDTO(restaurant: Restaurant): FormattedRestaurantDTO {
    return {
      restaurant_id: restaurant.restaurant_id,
      name: restaurant.restaurant_name,
      street: restaurant.address.formatted,
      cuisines: [restaurant.cuisines],
      hours: restaurant.hours,
    };
  }

  public static toRestaurantsDTO(restaurants: Restaurant[]): FormattedRestaurantDTO[] {
    return restaurants.map((restaurant) => {
      return this.toRestaurantDTO(restaurant);
    });
  }

  public static toMenuItemDTO(menuItem: MenuItem): MenuItemDTO {
    return {
      menu_item_id: menuItem.menu_item_id,
      menu_item_name: menuItem.menu_item_name,
      menu_item_description: menuItem.menu_item_description,
      menu_item_pricing: menuItem.menu_item_pricing,
      menu_category: menuItem.menu_category,
    }
  }

  public static toMenuItemsDTO(menuItems: MenuItem[]): MenuItemDTO[] {
    return menuItems.map((menuItem) => {
      return this.toMenuItemDTO(menuItem);
    });
  }
}
