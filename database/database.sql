create TABLE "user"(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    "password" VARCHAR(255),
    accessToken VARCHAR(255),
    refreshToken VARCHAR(255)
);

