import restaurantsServices from './services';

async function getRestaurantsByZipCode(req, res) {
  let { zip_code } = req.params;
  try {
    const restaurants = await restaurantsServices.getRestaurantsByZipCode(zip_code = 90045)
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getMenuByRestaurantId(req, res) {
  let { restaurant_id } = req.params;
  try {
    const menus = await restaurantsServices.getMenuByRestaurantId(restaurant_id)
    console.log('successfully got menus');
    res.status(200).send(menus);
  } catch (err) {
    console.log('error getting restaurant: ', err)
    res.status(400).send(err);
  }
}



export default {
  getRestaurantsByZipCode,
  getMenuByRestaurantId,
  checkPasswordWithEmail,
}