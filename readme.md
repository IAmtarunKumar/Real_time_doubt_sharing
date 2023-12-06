# Real-time Doubt Sharing System Documentation

## Introduction

### This document serves as a comprehensive guide to the functionality and implementation details of the real-time doubt sharing system. It covers various routes for user interactions, doubt management, and system maintenance.

# Cron Job

## Count Available Tutors

- **Description**: Periodically counts available tutors based on their recent activity.
- **Functionality**:
-Queries the database to count tutors active within the last 3 seconds.
-Logs the count and current time to the console.
- **Implementation**:
-A cron job is scheduled on server startup using `cron.schedule('* * * * * *', countAvailableTutors)`.

-The `countAvailableTutors`` function handles the database query and logging.


## User Routes

### Register User

- **Route**: `POST /user/register`

- **Description**: `Registers a new user in the system.`

- **Request Body**:
- `email`: User's email address.
- `password`: User's password.
- `name`: User's name.
- `type`: User type (student or tutor).
- `language`: User's preferred language.
- `subjectExpertise`: Subject expertise (only for tutor).
- `classGrade`: Student grade (only for student).

- **Response**:
- `200 OK`: Successful registration.
- `400 Bad Request`: Invalid or missing parameters.
- `500 Internal Server Error`: Server-side issues.

### Login User
- **Route**: `POST /user/login`
- **Description**: Logs in a user, generating an authentication token.
- **Request Body**:
- `email`: User's email address.
- `password`: User's password.
- **Response**:
- `200 OK`: Successful login and token.
- `400 Bad Request`: Invalid credentials.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Server-side issues.

### Logout
- **Route**: `POST /user/logout`
- **Description**:-  Logs out a user, blacklisting the token.
- **Request Body**:
- `token`: User's token.

- **Response**:
- `200 OK`: Successful logout.
- `500 Internal Server Error`: Server-side issues.

## Doubt Route
### Fetch Doubt History
- **Route**: `GET doubt/doubtHistory`

- **Description**: Retrieves the doubt history for a specific user by timestamp.

- **Request Body**:
- `user`: Token storing user data.

- **Response**:
- `200 OK`: Successful retrieval.
- `404 Not Found`: User or doubt history not found.
- `500 Internal Server Error`: Server-side issues.

## Get All Student Doubt History

- **Route**: `GET doubt/allUserDoubt`

- **Description**: Retrieves the doubt history for all users.

- **Request Body**:
- `user`: Token storing user data.

- **Response**:
- `200 OK`: Successful retrieval.- 
- `404 Not Found`: Doubt history not found.
- `500 Internal Server Error`: Server-side issues.

## Create Doubt
- **Route**: `POST doubt/create`
- **Description**: Creates a new doubt entry.

- **Request Body**:
- `user`: Request body object containing doubt details.

- **Response**:
- `200 OK`: Successful doubt creation.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Server-side issues.
## Update Doubt
- **Route**: `PATCH doubt/update/:id`
* **Description**: Updates an existing doubt entry.
- **Request Body**:
- `user`: Request body object containing updated doubt details.

- **Response**:
- `200 OK`: Successful updated.
- `404 Not Found`: Doubt not found.
- `500 Internal Server Error`: Server-side issues.

## Delete Doubt
- **Route**: `DELETE doubt/delete/:id`
- **Description**: Deletes a doubt entry.
- **Request Body**:
- `user`: req.body object containing user details.
- **Response**:
- `200 OK`: Successful deleted .
- `404 Not Found`: Doubt not found.
- `500 Internal Server Error`: Server-side issues.
## Tutor Route

### Update Ping Time

- **Route**: Get `/tutor/lastPingTimeUpdate`

- **Description**: Updates the last ping time for a tutor's availability.

**Request Body**:
- `user`: User data stored in the token.

**Response**:
- `200 OK`: Successful updated last ping time of tutor.
- `404 Not Found`: Tutor not found.
- `500 Internal Server Error`: Server-side issues.