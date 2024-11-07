# User Management

A User Management System for Admins and Sub Users.

## Prerequisites

- **Node.js** (v14 or above)
- **PostgreSQL** (for the database)

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`

`DB_PORT`

`DB_NAME`

`DB_USER`

`DB_PASSWORD`

`JWT_SECRET`

`PORT=3000`

## Setup Database

You’ll need to create a PostgreSQL database and user for the application. Run the following commands in your PostgreSQL console:

```bash
  CREATE DATABASE your_db_name;
  CREATE USER your_db_user WITH ENCRYPTED PASSWORD 'your_db_password';
  GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;
```

Make sure to replace your_db_name, your_db_user, and your_db_password with the actual values you want to use.

Once your database is set up, run Sequelize migrations to create the necessary tables. You can do this by running:

```bash
npx sequelize-cli db:migrate
```

This will create the admins, sub_users, and any other tables defined in the models.

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Swagger Implementation

Run the command to create Swagger Endpoint Description:

```bash
  node .\swagger.js
```

Now visit to your localhost url:

```bash
  localhost:3000/api-docs
```

## Feedback

If you have any feedback, please reach out to me at: taraanshnandwani123@gmail.com
