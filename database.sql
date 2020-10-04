-- CREATE DATABASE recipesearch;

--set extension
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE recipes(
    id SERIAL,
    user_id UUID,
    title VARCHAR(255),
    diets VARCHAR(255),
    image VARCHAR(255),
    ingredients TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);