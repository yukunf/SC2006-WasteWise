# User API Documentation

## Overview
This API provides basic CRUD operations for user resources, including creating, reading, updating, and deleting users. Each user includes the following fields:
- `id` (string): Unique identifier for the user (UUID)
- `username` (string): Username
- `email` (string): User's email address
- `password` (string): User's password
- `role` (enum): User role, possible values are `general`, `collector`, `regulator`

## Base URL
The base URL for all API endpoints is:

```
https://<your-domain>/api/users/
```

## Endpoints

### Get User List
- **URL**: `/api/users/`
- **Method**: GET
- **Description**: Retrieve a list of all users.
- **Response Example**:
  ```json
  [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "user1",
      "email": "user1@example.com",
      "password": "hashed_password",
      "role": "general"
    },
    ...
  ]
  ```

### Get Single User
- **URL**: `/api/users/{id}/`
- **Method**: GET
- **Description**: Retrieve details of a user by ID.
- **Response Example**:
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "user1",
    "email": "user1@example.com",
    "password": "hashed_password",
    "role": "general"
  }
  ```

### Create New User
- **URL**: `/api/users/`
- **Method**: POST
- **Description**: Create a new user.
- **Request Example**:
  ```json
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "new_password",
    "role": "collector"
  }
  ```
- **Response Example**:
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "hashed_password",
    "role": "collector"
  }
  ```

### Update User
- **URL**: `/api/users/{id}/`
- **Method**: PUT or PATCH
- **Description**: Update information of a user by ID.
- **Request Example**:
  ```json
  {
    "username": "updateduser",
    "email": "updateduser@example.com",
    "password": "updated_password",
    "role": "regulator"
  }
  ```
- **Response Example**:
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "updateduser",
    "email": "updateduser@example.com",
    "password": "hashed_password",
    "role": "regulator"
  }
  ```

### Delete User
- **URL**: `/api/users/{id}/`
- **Method**: DELETE
- **Description**: Delete a user by ID.
- **Response**: No content, status code 204
