/* eslint-disable class-methods-use-this */
import restaurants from './restaurants';
import menus from './menus';
import RestaurantsMapper from './mapper';
import { FormattedRestaurant, MenuItem, MenuData, Restaurant } from './restaurants.types';
import { FormattedRestaurantDTO, MenuItemDTO, MenuDataDTO, RestaurantDTO } from './dto';

/**
 * Due to demonstration purposes of this application, restaurant and menu data are mocked
 * with hardcoded data, but class implementation will stay to account for actual DB integration
 */

export interface RestaurantsService {
  getRestaurantsByZipcode(zip_code: number): Promise<FormattedRestaurantDTO[]>;
  getMenuByRestaurantId(restaurant_id: number): Promise<MenuItemDTO[]>;
}

export class RestaurantsServiceImpl implements RestaurantsService {
  async getRestaurantsByZipcode(zip_code: number): Promise<FormattedRestaurantDTO[]> {
    const restaurantsData: Restaurant[] = restaurants.restaurants;
    const restaurantsDTO = RestaurantsMapper.toRestaurantsDTO(restaurantsData);
    return restaurantsDTO;
  }

  async getMenuByRestaurantId(restaurant_id: number): Promise<MenuItemDTO[]> {
    const menusData: MenuData[] = menus.menus;
    const currentRestaurant = menusData.find(
      (menu) => menu.restaurant_id === Number(restaurant_id)
    );

    let menuItemsDTO: MenuItemDTO[];

    if (currentRestaurant) {
      menuItemsDTO = RestaurantsMapper.toMenuItemsDTO(currentRestaurant.menu_items);
    } else {
      throw new Error('current restaurant does not exist');
    }
    return menuItemsDTO;
  }
}
