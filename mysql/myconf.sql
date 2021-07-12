-- tables
-- Table: users
CREATE table user (
  id INT AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  PRIMARY KEY (id)
)
