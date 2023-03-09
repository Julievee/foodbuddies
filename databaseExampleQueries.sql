-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create users table
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);

-- Insert some users (C in CRUD - Create)
INSERT INTO users
  (username, password)
VALUES
  ('julievee',  'lul21'),


-- Read some users (R in CRUD - Read)
SELECT * FROM users;
