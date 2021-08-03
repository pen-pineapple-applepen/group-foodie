const db = require('../db');

// user friends
const getOneUserInfo = async (user_id) => {
  const user = await db('users')
    .select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'guest')
    .where({ id: user_id })
  return user[0];
}

const createUser = async(first_name, last_name, email, username, password, guest) => {
  const insertedId = await db('users')
    .insert({
      first_name,
      last_name,
      email,
      username,
      password,
      guest,
    }, 'id')
  return insertedId;
}

const getFriends = async (user_id) => {
  const friends = await db.select(
    'users.id as id', 'first_name', 'last_name', 'email', 'password', 'guest'
  ).from('users')
  .join('friends_join_table', function() {
    this.on('friends_join_table.friend_id', '=', 'users.id')
    .andOn('friends_join_table.user_id', '=', user_id)
  })
  return friends;
}

const createFriend = async(user_id, friend_id) => {
  await db('friends_join_table')
    .insert({
      user_id,
      friend_id,
    })
}

const checkPasswordWithEmail = async (email, password) => {
  const emailsThatMatchPassword = await db.select('email', 'id').from('users')
    .where({ email, password })

  if (emailsThatMatchPassword.length){
    return {
      hasCorrectCredentials: true,
      id: emailsThatMatchPassword[0].id,
    }
  } else {
    return {
      hasCorrectCredentials: false,
      id: null,
    }
  }
}