# Uber Clone Project

## Overview

This is the backend API for the Uber Clone application, built with **Express.js** and **MongoDB**.

---

## Authentication

The API uses **JWT (JSON Web Token)** for authentication. Tokens are generated upon successful registration or login.

---

## API Endpoints

### 1. User Registration

#### **Endpoint**

`POST /user/register`

#### **Description**

This endpoint registers a new user in the system.

#### **Request Body**

The request body should be a JSON object with the following fields:

| Field       | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| `fullname`  | object | Yes      | Contains the user's first and last name. |
| `firstname` | string | Yes      | Must be at least 3 characters long.      |
| `lastname`  | string | No       | Must be at least 3 characters long.      |
| `email`     | string | Yes      | Must be a valid email address.           |
| `password`  | string | Yes      | Must be at least 6 characters long.      |

#### Example:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

---

### 2. User Login

#### **Endpoint**

`POST /user/login`

#### **Description**

This endpoint logs in an existing user by validating their credentials and returning user details along with a JWT token upon successful login.

#### **Request Body**

The request body must be a JSON object with the following fields:

| Field      | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | string | Yes      | Must be a valid email address.      |
| `password` | string | Yes      | Must be at least 6 characters long. |

#### Example:

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

---

### 3. User Profile

**Endpoint:** `/user/profile`

**Method:** `GET`

**Description:** Retrieves the profile information of the authenticated user.

**Headers:**

-   `Authorization: Bearer <token>`

**Response:**

-   `200 OK`: Returns the user profile data.
-   `401 Unauthorized`: If the user is not authenticated or the token is invalid.

**Example:**

```json
{
    "data": {
        "_id": "user_id",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
        // ...other user fields...
    }
}
```

---

### 4. User Logout

**Endpoint:** `/user/logout`

**Method:** `GET`

**Description:** Logs out the authenticated user by blacklisting the current token.

**Headers:**

-   `Authorization: Bearer <token>`

**Response:**

-   `200 OK`: Successfully logged out and token blacklisted.
-   `401 Unauthorized`: If the user is not authenticated or the token is invalid.

**Example:**

```json
{
    "message": "logout user"
}
```

---

### Validation Rules

-   **email:** Must be a valid email format.
-   **password:** Must be at least 6 characters long.

---

### Responses

#### **201 Created** (User Registration)

-   **Description:** User successfully registered.
-   **Response Body:** A JSON object containing the user details and a JWT token.

##### Example:

```json
{
    "user": {
        "_id": "60c72b2f9b1e8b001c8e4d5a",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **200 OK** (User Login)

-   **Description:** User successfully logged in.
-   **Response Body:** A JSON object containing user details and a JWT token.

##### Example:

```json
{
    "user": {
        "_id": "60c72b2f9b1e8b001c8e4d5a",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **400 Bad Request**

-   **Description:** Validation errors or missing required fields.
-   **Response Body:** A JSON object containing an array of validation errors.

##### Example:

```json
{
    "errors": [
        {
            "msg": "Invalid email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

#### **401 Unauthorized**

-   **Description:** Invalid email or password.
-   **Response Body:** A JSON object containing an error message.

##### Example:

```json
{
    "message": "invalid email or password"
}
```

---

## Blacklist Token

**Description:** The blacklist token mechanism is used to invalidate tokens upon user logout. When a user logs out, their token is added to the blacklist and will no longer be accepted for authentication.

**Schema:**

-   `token`: The JWT token string.
-   `createdAt`: The timestamp when the token was blacklisted. The token will automatically expire and be removed from the database after 24 hours.

**Example:**

```json
{
    "token": "jwt_token_string",
    "createdAt": "2023-10-10T10:00:00Z"
}
```

This code defines a blacklist mechanism to restrict access to certain resources or functionalities based on predefined criteria. The blacklist is typically used to prevent specific users, IP addresses, or other entities from accessing a system.

#### Key Components

-   **Blacklist Data Structure**: A MongoDB collection that stores the blacklisted tokens.
-   **Check Function**: A function that checks if a given token is present in the blacklist.
-   **Add Function**: A function that adds a token to the blacklist.

#### Example Usage

1. **Initialize the Blacklist**: The `BlacklistToken` model is used to interact with the blacklist collection in MongoDB.
2. **Add Tokens to the Blacklist**: Use the `create` method to add tokens to the blacklist.
3. **Check Tokens**: Use the `findOne` method to verify if a token is blacklisted.

#### Code Example

**auth.middleware.js**

```javascript
import BlacklistToken from "../models/blacklistToken.model.js";

const authUser = asyncHandler(async (request, response, next) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers?.authorization?.split(" ")[1];
    if (!token) {
        return response.status(401).json({ message: "Unauthorized" });
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });
    if (isTokenBlacklisted) {
        return response.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isUserExist = await User.findById({ _id: decoded._id });
        request.user = isUserExist;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Unauthorized" });
    }
});
```

**user.controller.js**

```javascript
const logoutUser = asyncHandler(async (request, response) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers.authorization.split(" ")[1];
    await BlacklistToken.create({ token });
    return response
        .status(200)
        .clearCookie(ACCESS_TOKEN)
        .json({ message: "logout user" });
});
```

#### Benefits

-   **Security**: Enhances security by preventing unauthorized access.
-   **Flexibility**: Easily manage and update the list of blacklisted tokens.
-   **Efficiency**: Quickly check if a token is blacklisted using efficient database queries.

#### Considerations

-   **Scalability**: Ensure the blacklist can handle a large number of tokens.
-   **Performance**: Optimize the check function for fast lookups.
-   **Maintenance**: Regularly update the blacklist to reflect current security

### 5. Captain Registration

#### **Endpoint**

`POST /captain/register`

#### **Description**

This endpoint registers a new captain in the system.

#### **Request Body**

The request body should be a JSON object with the following fields:

| Field                 | Type   | Required | Description                                               |
| --------------------- | ------ | -------- | --------------------------------------------------------- |
| `fullname`            | object | Yes      | Contains the captain's first and last name.               |
| `firstname`           | string | Yes      | Must be at least 3 characters long.                       |
| `lastname`            | string | No       | Must be at least 3 characters long.                       |
| `email`               | string | Yes      | Must be a valid email address.                            |
| `password`            | string | Yes      | Must be at least 6 characters long.                       |
| `vehicle`             | object | Yes      | Contains the captain's vehicle details.                   |
| `vehicle.color`       | string | Yes      | The vehicle's color (min length: 3).                      |
| `vehicle.plate`       | string | Yes      | The vehicle's plate number (min length: 5).               |
| `vehicle.capacity`    | number | Yes      | The vehicle's capacity (min: 1).                          |
| `vehicle.vehicleType` | string | Yes      | The vehicle's type (one of: "car", "motorcycle", "auto"). |

#### Example:

```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "securepassword",
    "vehicle": {
        "color": "Red",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

policies.

This documentation provides an overview of the blacklist implementation, its components, usage, benefits, and considerations.

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the server folder:**

    ```bash
    cd server
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a \*\***`.env`\***\* file** in the server folder with the following content:

    ```plaintext
    PORT=4000
    MONGO_DB_URL=your_mongodb_connection_string
    CROSS_ORIGIN=*
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the server:**

    ```bash
    npm run dev
    ```

    The server will start on the port specified in the `.env` file (default is `4000`).

---

## Security Features

-   **Password hashing:** Using `bcryptjs` to securely store passwords.
-   **JWT-based authentication:** To manage user sessions.
-   **Input validation:** Using `express-validator` for robust input sanitization and validation.

---

## Error Handling

The API uses a centralized error-handling mechanism with async handler middleware. All endpoints return standardized error responses to ensure consistency and clarity.

---

Thank you for using the Uber Clone API! If you have any questions or issues, feel free to reach out.
