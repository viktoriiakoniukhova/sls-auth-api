# **AUTH API**

In this task, I needed to implement a simple REST API using the Express framework. The essence of the API is to register and authorize users using JWT tokens.

## **REQUIREMENTS**

1. As a database, your app should use **PostgreSQL** (no ORMs).
2. Protected endpoints must expect a valid token passed in the request headers. For example: **Authorization: Bearer <access_token>**. Token validation should happen in the middleware layer. User passwords must be encrypted before storing them in the database.
3. Access token’s TTL should be limited to **60 minutes**. After 60 minutes from its creation, an access token will be considered as expired. This TTL should be configurable in the environment variables.
4. Refresh token should be valid forever.
5. JWT secret should be stored in the environment variables.
