CREATE DATABASE recipesearch;

--set extension
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE recipes(
    recipe_id SERIAL,
    user_id UUID,
    label VARCHAR(50) NOT NULL,
    dietLabels VARCHAR(50),
    source VARCHAR(50),
    image BYTEA,
    url VARCHAR(255),
    text VARCHAR(255),
    PRIMARY KEY (recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);