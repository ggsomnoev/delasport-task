# Task 1 – Create CRUD API

## Database Setup

1. Use a Docker image to run a database (you can choose the database).
2. Create a table named `users` with the following fields:
   - `name`, `surname`, `email`, `age`, `favorite_color`, `contact_preference`.
3. Implement migrations.
4. Add a unique email constraint.

## Backend Development

1. Set up a Node.js server using Express.js (or another framework of your choice).
2. Implement the following API endpoints:
   - `POST /users` - Create a new user.
   - `GET /users` - Retrieve a list of users.
   - `PUT /users/:id` - Update a user by ID.
   - `DELETE /users/:id` - Delete a user by ID.

## Best Practices

1. Use environment variables.
2. Implement logging with Winston:
   - Use proper severity levels.
3. Implement error handling.

## Dockerization

1. Containerize the application using Docker.
2. Use a Docker Compose file to orchestrate both the database and the application.
3. Expose the API on a port of your choice (e.g., `http://localhost:3000`).

## Frontend Integration

1. Download and run a frontend application (provided separately) [Frontend Download Link](https://we.tl/t-oRyJs2Ft7q).
2. Configure the frontend to interact with your API.
