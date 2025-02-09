# Task 1 – Create CRUD API

## Database Setup

1. Use a Docker image to run a database (you can choose the database).  
   b. Create a table named `users` with the following fields:  
   i. `name`, `surname`, `email`, `age`, `favorite_color`, `contact_preference`.  
   c. Implement migrations.  
   d. Add a unique email constraint.

## Backend Development

2. Set up a Node.js server using Express.js (or another framework of your choice).  
   b. Implement the following API endpoints:  
   i. `POST /users` - Create a new user.  
   ii. `GET /users` - Retrieve a list of users.  
   iii. `PUT /users/:id` - Update a user by ID.  
   iv. `DELETE /users/:id` - Delete a user by ID.

## Best Practices

3. Use environment variables.  
   b. Implement logging with Winston:  
   i. Use proper severity levels.  
   c. Implement error handling.

## Dockerization

4. Containerize the application using Docker.  
   b. Use a Docker Compose file to orchestrate both the database and the application.  
   c. Expose the API on a port of your choice (e.g., `http://localhost:3000`).

## Frontend Integration

5. Download and run a frontend application (provided separately) [Frontend Download Link](https://we.tl/t-oRyJs2Ft7q).  
   b. Configure the frontend to interact with your API.
