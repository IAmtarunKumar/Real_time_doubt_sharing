# Real-time doubt sharing Assignment

## This document outlines the available routes, their functionalities, expected inputs, and responses for the application.

# Cron Job

## Count Available Tutors

- **Description**: Runs a cron job every second to count the available tutors based on their last ping time within a 3-second window from the current time.
- **Functionality**:
  - Queries the database to count tutors with lastPingTime within the specified window.
  - Logs the count of available tutors and the current time to the console.
- **Implementation**:
  - The cron job is initialized upon server startup using `cron.schedule('* * * * * *', countAvailableTutors)`.
  - `countAvailableTutors` function performs the database query and logging.

## User Routes

### Register User

- **Route**: `POST /user/register`
- **Description**: Registers a new user in the system.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
  - `name `
  - `type `
  - `language`
  - `subjectExpertise`
  - `classGrade`
- **Response**:
  - `200 OK`
  - `400 Bad Request`
  - `500 Internal Server Error`

### Login User

- **Route**: `POST /user/login`
- **Description**: Logs in a user and generates an authentication token.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
- **Response**:
  - `200 OK`
  - `400 Bad Request`
  - `404 Not Found`
  - `500 Internal Server Error`

### Logout

- **Route**: `POST /user/logout`
- **Description**: User logout and token blacklisted
- **Request Body**:
  - `token`: User's token.
- **Response**:
  - `200 OK`
  - `500 Internal Server Error`

## Dought Routes

### Fetch Dought History

- **Route**: `GET doubt/doubtHistory`
- **Description**: Retrieves the dought history for a specific user by time stamp.
- **Request Body**:
  - `user`: token store user data.
- **Response**:
  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`

### Get all student doubt History

- **Route**: `GET doubt/allUserDoubt`
- **Description**: Retrieves all user doubt history
- **Request Body**:
  - `user`: token store user data.
- **Response**:
  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`

### Create doubt

- **Route**: `GET doubt/create`
- **Description**: Create doubt
- **Request Body**:
  - `user`: req.body object
- **Response**:

  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`

  ### Update doubt

- **Route**: `GET doubt/update/:id`
- **Description**: update doubt
- **Request Body**:
  - `user`: req.body object
- **Response**:

  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`

  ### Delete doubt

- **Route**: `GET doubt/delete/:id`
- **Description**: Delete doubt
- **Request Body**:
  - `user`: req.body object
- **Response**:
  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`

## Tutor Routes

### Update Ping Time

- **Route**: `GET /tutor/lastPingTimeUpdate`
- **Description**: Updates the last ping time for a tutor's availability.
- **Request Body**:
  - `user`: user data store in token
- **Response**:
  - `200 OK`
  - `404 Not Found`
  - `500 Internal Server Error`
