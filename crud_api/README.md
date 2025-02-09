# CRUD API with TypeScript, Express, and Sequelize

## Overview

This project is a CRUD API built with TypeScript, Express, and Sequelize (PostgreSQL). It fulfills the requirements described in `delasport-task-one-desc.md`.

## Setup

### Prerequisites

- Node.js (used version `v22.13.1`)
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/ggsomnoev/delasport-task.git
   cd ./delasport-task/crud-api
   ```
2. Install dependencies:
   ```sh
   make install
   ```
3. Create a `.env` file in the root directory, you can copy the values from the `.env.example` file.

### Database Setup

Run migrations:

```sh
make db-migrate
```

Seed the database (if applicable):

```sh
make db-seed
```

## Running the Server

1. Build the project:
   ```sh
   make build
   ```
2. Start the server:
   ```sh
   make start
   ```

## Running with docker

1. Start the containers:

   ```sh
   make docker-up
   ```

2. Stop the containers:

   ```sh
   make docker-down
   ```

3. Clean up and rebuild the containers:
   ```sh
   make docker-up-clean
   ```

## API Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/users`     | Get all users       |
| POST   | `/users`     | Create a new user   |
| PUT    | `/users/:id` | Update a user by ID |
| DELETE | `/users/:id` | Delete a user by ID |

---

## Frontend

The frontend for this project is located in the `delasport-task-main` directory. Please refer to the README file for more info.
