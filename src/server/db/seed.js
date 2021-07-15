COPY users(id, first_name, last_name, email, username, password, guest)
FROM '/Users/erikoh/Desktop/hackreactor/blue-ocean/group-foodie-ppap/src/server/db/seed/users.csv'
DELIMITER ','
CSV HEADER;

COPY friends_join_table(id, user_id, friend_id)
FROM '/Users/erikoh/Desktop/hackreactor/blue-ocean/group-foodie-ppap/src/server/db/seed/friends_join_table.csv'
DELIMITER ','
CSV HEADER;