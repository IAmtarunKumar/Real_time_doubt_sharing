DoubtShare Platform
DoubtShare is an interactive real-time doubt-solving platform designed to assist students with their academic queries.

Table of Contents
User API
Login
Register
Logout
Doubt API
Doubt History
User Doubt
Create Doubt
Update Doubt
Delete Doubt
Tutor API
Polling
User API
1. Login
Endpoint: POST /user/login
Description: Logs in a user and provides a token for authentication.
Request:
Headers: None
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "user_password"
}
Response:
Status: 200 OK
Body:
json
Copy code
{
  "token": "user_token_here"
}
2. Register
Endpoint: POST /user/register
Description: Registers a new user.
Request:
Headers: None
Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "user_password",
  "type": "student",
  "language": "English",
  "subjectExpertise": null,
  "classGrade": "10th"
}
Response:
Status: 201 Created
Body: None
3. Logout
Endpoint: POST /user/logout
Description: Logs out a user.
Request:
Headers:
Authorization: Bearer user_token_here
Body: None
Response:
Status: 200 OK
Body: None
Doubt API
1. Doubt History
Endpoint: GET /doubt/doubtHistory
Description: Retrieves the doubt history of the authenticated user.
Request:
Headers:
Authorization: Bearer user_token_here
Body: None
Response:
Status: 200 OK
Body:
json
Copy code
[
  {
    "id": "doubt_id_here",
    "timestamp": "2023-01-01T12:00:00Z",
    "content": "Doubt content here"
  },
  // ... additional doubts
]
2. User Doubt
Endpoint: GET /doubt/userDoubt
Description: Retrieves details of a specific doubt for the authenticated user.
Request:
Headers:
Authorization: Bearer user_token_here
Body: None
Response:
Status: 200 OK
Body:
json
Copy code
{
  "id": "doubt_id_here",
  "timestamp": "2023-01-01T12:00:00Z",
  "content": "Doubt content here"
}
3. Create Doubt
Endpoint: POST /doubt/create
Description: Creates a new doubt for the authenticated user.
Request:
Headers:
Authorization: Bearer user_token_here
Body:
json
Copy code
{
  "content": "New doubt content here"
}
Response:
Status: 200 OK
Body: None
4. Update Doubt
Endpoint: PATCH /doubt/update/:id
Description: Updates an existing doubt for the authenticated user.
Request:
Headers:
Authorization: Bearer user_token_here
Body:
json
Copy code
{
  "content": "Updated doubt content here"
}
Response:
Status: 200 OK
Body: None
5. Delete Doubt
Endpoint: DELETE /doubt/delete/:id
Description: Deletes a doubt for the authenticated user.
Request:
Headers:
Authorization: Bearer user_token_here
Body: None
Response:
Status: 200 OK
Body: None
Tutor API
1. Polling
Endpoint: GET /tutor/polling
Description: Initiates polling for online tutors.
Request:
Headers:
Authorization: Bearer user_token_here
Body: None
Response:
Status: 200 OK
Body: None