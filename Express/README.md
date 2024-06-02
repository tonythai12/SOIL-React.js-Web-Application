# Project Overview

### Github URL

- https://github.com/rmit-fsd-2024-s1/s3939906-s4002970-a2

### Tools to be installed:

- "express"
- "mysql"
- "cors"
- "dotenv"
- "bcrypt"
- "jsonwebtoken"

### App.js

- In App.js, I connected to a MySQL database and set up the main path for the Express router using Express middleware. Finally, I started the server using Express.

### .env / config.js

- In the .env file, I stored sensitive information such as database configuration details, database host information, and JWT secret. In config.js, I created a required function to double-check whether the essential information from the environment variables is properly configured before using it.

- In the actual code files, instead of directly using the information from the .env file, I imported config.js and applied the required environment information to the code.

# router folder

- In the router folder, I used express.Router to set up endpoints. These endpoints specify the paths and methods that the client should use to send data.

# controller folder

- In the controller folder, we handle receiving desired data from the database, processing logic, and sending status and information to the client.

# data folder

- In the data folder, we write SQL queries to communicate with the MySQL database and retrieve data to send to the controller.

# middleware folder

- This function is responsible for verifying user authentication.
- It starts by retrieving the authentication token from the request header and checks if it starts with 'Bearer '.
- Then, it decodes the token to identify the user and verifies if the user exists. If the user is authenticated, it adds the user ID to the request object and passes it to the next middleware.
- If authentication fails, it returns a 401 status code with an authentication error message.
