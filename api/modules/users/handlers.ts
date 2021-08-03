import usersServices from './services.ts'

async function getOneUser(req, res) {
  const { user_id } = req.params;
  try {
    const user = await usersServices.getOneUserInfo(Number(user_id));
    res.status(200).send(user);
  } catch (err) {
    console.log('error getting one user: ', err);
    res.status(404).send(err);
  }
}

async function createUser(req, res) {
  const { first_name, last_name, email, username, password, guest } = req.body;
  try {
    const userId = await usersServices.createUser(first_name, last_name, email, username, password, guest);
    res.status(200).send(userId);
  } catch (err) {
    console.log('error creating user: ', err);
    res.status(404).send(err);
  }
}

async function getFriends(req, res) {
  const { user_id } = req.params;
  try {
    const friends = await usersServices.getFriends(Number(user_id));
    res.status(200).send(friends);
  } catch (err) {
    console.log('error getting friends: ', err);
    res.status(404).send(err);
  }
}

async function createFriend(req, res) {
  const { user_id } = req.params;
  const { friend_id } = req.body;
  try {
    await usersServices.createFriend(user_id, friend_id);
    res.status(200).send('created friend');
  } catch (err) {
    console.log('error creating friend: ', err);
    res.status(404).send(err);
  }
}

async function checkPasswordWithEmail(req, res) {
  console.log("req.query:", req.query);
  const { email, password } = req.query;
  try {
    const passwordIsCorrect = await usersServices.checkPasswordWithEmail(email, password)
    console.log('password checks out');
    res.status(200).send(passwordIsCorrect);
  } catch (err) {
    console.log('error getting restaurant: ', err)
    res.status(400).send(err);
  }
}

export default {
  getOneUser,
  createUser,
  getFriends,
  createFriend,
  checkPasswordWithEmail,
};
