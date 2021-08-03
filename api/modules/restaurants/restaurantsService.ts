const getRestaurantsByZipCode = async (zip_code) => {
  const restaurantsData = restaurants.restaurants;

  const allRestaurants = restaurantsData.reduce((acc, restaurant) => {
    const formattedRestaurant = {}
    formattedRestaurant.restaurant_id = restaurant.restaurant_id;
    formattedRestaurant.name = restaurant.restaurant_name;
    formattedRestaurant.street = restaurant.address.formatted;
    formattedRestaurant.cuisines = [restaurant.cuisines];
    formattedRestaurant.hours = restaurant.hours;
    acc.push(formattedRestaurant)
    return acc;

  }, [])
  return allRestaurants;
}

const getMenuByRestaurantId = async (restaurant_id) => {
  const menusData = menus.menus;
  const currentRestaurant = menusData.find(menu => menu.restaurant_id === Number(restaurant_id));
  const menuItems = currentRestaurant.menu_items;

  return menuItems;
}