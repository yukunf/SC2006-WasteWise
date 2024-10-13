# User Management API

This API allows you to manage users and their profiles. You can create users, retrieve user details, update user information, and delete users. Additionally, users can be updated fully (with `updateall`) or partially (with `update`).

## Base URL

```
http://localhost:8000/api/
```

---

## Endpoints

### 1. **Register a New User**

- **Endpoint**: `/users/register/`
- **Method**: `POST`
- **Description**: Creates a new user along with a `UserProfile`. The `role` and `collector_id` fields are stored in the `UserProfile`.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "collector",
  "collector_id": 12345
}
```

#### Response

- **Status**: `201 Created`
- **Body**:

```json
{
  "message": "User created successfully"
}
```
---

### 2. **Login User**
### **Endpoint**: `/users/login/`

- **Method**: `POST`
- **Description**: Authenticates a user based on their email and password. Returns an authentication token if the login is successful.

#### Request

##### URL

```
POST /api/users/login/
```

##### Request Body (JSON)

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response

- **Status**: `200 OK` (On successful login)
- **Body**:

```json
{
  "token": "abcdef1234567890abcdef1234567890",  
  "email": "user@example.com",
  "user_id": 1,
  "role":"general" 
}
```

- **Status**: `401 Unauthorized` (If authentication fails)
- **Body**:

```json
{
  "error": "Invalid credentials"
}
```

---

### **Authentication**

After logging in and receiving a token, this token should be included in the headers of future authenticated requests.

#### Example of Using the Token:

Include the token in the `Authorization` header for authenticated requests.

```
Authorization: Token abcdef1234567890abcdef1234567890
```

#### Example Authenticated Request:

```bash
GET /api/users/1/
Authorization: Token abcdef1234567890abcdef1234567890
```

### Notes:

- **Token Expiration**: The token does not expire by default, but you may want to implement token expiration based on your needs.
- **Error Handling**: If the email or password is incorrect, the response will return a `401 Unauthorized` status with an error message.

---

### Common Issues:

- **Invalid Credentials**: If the provided email or password is incorrect, the API will return a `401 Unauthorized` error.
- **Token Not Provided**: For authenticated requests, if no token is provided or the token is invalid, the API will return a `401 Unauthorized` response.

This API allows users to log in using their email and password, and it returns an authentication token for subsequent authenticated requests.
### 3. **Retrieve User Details**

- **Endpoint**: `/users/<id>/`
- **Method**: `GET`
- **Description**: Retrieves the details of a specific user by their `id`.

#### Request

- **URL Parameters**:
  - `id`: The unique identifier of the user.

#### Response

- **Status**: `200 OK`
- **Body**:

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "collector",
  "collector_id": 12345
}
```

---

### 4. **Full Update of User Information**

- **Endpoint**: `/users/<id>/updateall/`
- **Method**: `PUT`
- **Description**: Fully updates the user and profile information. All fields are required.

#### Request

- **URL Parameters**:
  - `id`: The unique identifier of the user.

#### Request Body

```json
{
  "email": "updateduser@example.com",
  "first_name": "UpdatedFirst",
  "last_name": "UpdatedLast",
  "role": "admin",
  "collector_id": 54321
}
```

#### Response

- **Status**: `200 OK`
- **Body**:

```json
{
  "id": 1,
  "email": "updateduser@example.com",
  "first_name": "UpdatedFirst",
  "last_name": "UpdatedLast",
  "role": "admin",
  "collector_id": 54321
}
```

---

### 5. **Partial Update of User Information**

- **Endpoint**: `/users/<id>/update/`
- **Method**: `PATCH`
- **Description**: Partially updates user and profile information. Only the provided fields will be updated.

#### Request

- **URL Parameters**:
  - `id`: The unique identifier of the user.

#### Request Body

```json
{
  "first_name": "UpdatedFirst",
  "role": "admin"
}
```

#### Response

- **Status**: `200 OK`
- **Body**:

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "UpdatedFirst",
  "last_name": "Doe",
  "role": "admin",
  "collector_id": 12345
}
```

---

### 6. **Delete a User**

- **Endpoint**: `/users/<id>/`
- **Method**: `DELETE`
- **Description**: Deletes a specific user by their `id`.

#### Request

- **URL Parameters**:
  - `id`: The unique identifier of the user.

#### Response

- **Status**: `204 No Content`

---

### 7. **List All Users**

- **Endpoint**: `/users/`
- **Method**: `GET`
- **Description**: Retrieves a list of all users.

#### Response

- **Status**: `200 OK`
- **Body**:

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "collector",
    "collector_id": 12345
  },
  {
    "id": 2,
    "email": "anotheruser@example.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "admin",
    "collector_id": null
  }
]
```

---

## Notes

- **Authorization**: If authentication is required, include the appropriate authentication headers.
- **Error Handling**: On validation errors or failed requests, the API will return a `400 Bad Request` or a relevant HTTP status code along with an error message.

---

This API allows for full and partial updates on user data, as well as creation, retrieval, and deletion of user accounts. You can modify the `role` and `collector_id` fields, which are part of the user's profile.