# Uber Clone API

## Overview

This is the backend API for the Uber Clone application, built with **Express.js** and **MongoDB**.

## Authentication

The API uses **JWT (JSON Web Token)** for authentication. Tokens are generated upon successful registration.

---

## API Endpoints

### 1. User Registration

#### **Endpoint**

`POST /api/user/register`

#### **Description**

This endpoint registers a new user in the system.

#### **Request Body**

The request body should be a JSON object with the following fields:

-   **`fullname`**: An object containing:
    -   **`firstname`** (string, required, minimum length: 3)
    -   **`lastname`** (string, optional, minimum length: 3)
-   **`email`** (string, required, must be a valid email)
-   **`password`** (string, required, minimum length: 6)

**Example:**

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

#### **Validation Rules**

-   **`email`**: Must be a valid email format.
-   **`fullname.firstname`**: Must be at least 3 characters long.
-   **`password`**: Must be at least 6 characters long.

#### **Responses**

-   **201 Created**

    **Description:** User successfully registered.

    **Body:** JSON object containing the user details and a JWT token.

    **Example:**

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

-   **400 Bad Request**

    **Description:** Validation errors or missing required fields.

    **Body:** JSON object containing the validation errors.

    **Example:**

    ```json
    {
        "errors": [
            {
                "msg": "Invalid email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "first name must be at least 3 characters long",
                "param": "fullname.firstname",
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

---

## Setup Instructions

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

4. **Create a `.env` file** in the server folder with the following content:

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
