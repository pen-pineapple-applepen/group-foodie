DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL,
  first_name VARCHAR NULL,
  last_name VARCHAR NULL,
  email VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  guest BOOLEAN NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS friends_join_table CASCADE;
CREATE TABLE friends_join_table (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  food VARCHAR NULL,
  quantity INTEGER NULL,
  price DECIMAL NULL,
  date VARCHAR NULL,
  food_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  restaurant_id INTEGER NULL,
  live BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  text VARCHAR NULL,
  date VARCHAR NULL,
  group_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS payment_info CASCADE;
CREATE TABLE payment_info (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  card_number INTEGER NOT NULL,
  card_type VARCHAR NOT NULL,
  exp_date VARCHAR NOT NULL,
  cvv INTEGER NOT NULL,
  zip_code INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE groups (
  id SERIAL NOT NULL,
  due_date VARCHAR NOT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE friends_join_table ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE friends_join_table ADD FOREIGN KEY (friend_id) REFERENCES users (id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE orders ADD FOREIGN KEY (group_id) REFERENCES groups (id);
ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE comments ADD FOREIGN KEY (group_id) REFERENCES groups (id);
ALTER TABLE payment_info ADD FOREIGN KEY (user_id) REFERENCES users (id);
INSERT INTO groups(due_date)VALUES(10/24/2021);
-- INSERT INTO orders(user_id, food, quantity, price, date, food_id, group_id, restaurant_id)VALUES(5, 'PIZZA', 3, 3.50, '12/20/2020', 423, 1, 32);
COPY users(id, first_name, last_name, email, username, password, guest)
FROM '/Users/austinyeon/Desktop/group-foodie/src/server/db/seed/users.csv'
DELIMITER ','
CSV HEADER;
COPY friends_join_table(id, user_id, friend_id)
FROM '../db/seed/friends_join_table.csv'
DELIMITER ','
CSV HEADER;
COPY payment_info(id, name, card_number, card_type, exp_date, cvv, zip_code, user_id)
FROM '../db/seed/payment_info.csv'
DELIMITER ','
CSV HEADER;
SELECT pg_catalog.setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('payment_info', 'id'), (SELECT MAX(id) FROM payment_info)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('groups', 'id'), (SELECT MAX(id) FROM groups)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('comments', 'id'), (SELECT MAX(id) FROM comments)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('friends_join_table', 'id'), (SELECT MAX(id) FROM friends_join_table)+1);