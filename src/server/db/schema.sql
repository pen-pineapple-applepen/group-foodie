DROP TABLE IF EXISTS users;
​
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
​
DROP TABLE IF EXISTS friends_join_table;
​
CREATE TABLE friends_join_table (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
​
DROP TABLE IF EXISTS orders;
​
CREATE TABLE orders (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  food VARCHAR NULL,
  quantity INTEGER NULL,
  price INTEGER NULL,
  date VARCHAR NULL,
  food_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  restaurant_id INTEGER NULL,
  PRIMARY KEY (id)
);
​
DROP TABLE IF EXISTS comments;
​
CREATE TABLE comments (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL,
  text VARCHAR NULL,
  date time NULL,
  group_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS payment_Info;
​
CREATE TABLE payment_Info (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  card_number INTEGER NOT NULL,
  card_type VARCHAR NOT NULL,
  exp_date INTEGER NOT NULL,
  cvv INTEGER NOT NULL,
  zip_code INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
​
DROP TABLE IF EXISTS groups;
​
CREATE TABLE groups (
  id SERIAL NOT NULL,
  time_limit INTEGER NOT NULL,
  PRIMARY KEY (id)
);
​
ALTER TABLE friends_join_table ADD FOREIGN KEY (user_id) REFERENCES Users (id);
ALTER TABLE friends_join_table ADD FOREIGN KEY (friend_id) REFERENCES Users (id);
ALTER TABLE Orders ADD FOREIGN KEY (user_id) REFERENCES Users (id);
ALTER TABLE Orders ADD FOREIGN KEY (group_id) REFERENCES Groups (id);
ALTER TABLE Comments ADD FOREIGN KEY (user_id) REFERENCES Users (id);
ALTER TABLE Comments ADD FOREIGN KEY (group_id) REFERENCES Groups (id);
ALTER TABLE Payment_Info ADD FOREIGN KEY (user_id) REFERENCES Users (id);
​
COPY users(id, first_name, last_name, email, username, password, guest)
FROM '/Users/erikoh/Desktop/hackreactor/blue-ocean/group-foodie-ppap/src/server/db/seed/users.csv'
DELIMITER ','
CSV HEADER;

COPY friends_join_table(id, user_id, friend_id)
FROM '/Users/erikoh/Desktop/hackreactor/blue-ocean/group-foodie-ppap/src/server/db/seed/friends_join_table.csv'
DELIMITER ','
CSV HEADER;