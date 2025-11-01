# API Test Plan: FakeRestAPI

## 1. API Overview

- **API Name**: FakeRestAPI
- **Base URL**: https://fakerestapi.azurewebsites.net/api/v1
- **OpenAPI Specification**: https://fakerestapi.azurewebsites.net/swagger/v1/swagger.json
- **API Type**: REST API
- **Authentication**: None (Public API)
- **Purpose**: A fake REST API for testing and prototyping

## 2. API Endpoints Analysis

### 2.1 Activities Endpoints

#### GET /api/v1/Activities
**Description**: Retrieve all activities

**Test Scenarios**:

##### 2.1.1 Happy Path - Retrieve All Activities
- **Method**: GET
- **Endpoint**: `/api/v1/Activities`
- **Expected Status Code**: 200
- **Expected Response**: Array of activity objects
- **Sample Response**:
```json
[
  {
    "id": 1,
    "title": "Activity 1",
    "dueDate": "2025-11-01T10:45:05.5030000+00:00",
    "completed": false
  }
]
```
- **Validation**:
  - Response is an array
  - Each item has required fields: id, title, dueDate, completed
  - id is a positive integer
  - title is a non-empty string
  - dueDate is a valid ISO 8601 datetime
  - completed is a boolean

##### 2.1.2 Response Performance Test
- **Method**: GET
- **Endpoint**: `/api/v1/Activities`
- **Performance Criteria**:
  - Response time < 2000ms
  - Successful status code 200
- **Validation**:
  - Measure response time
  - Verify response within acceptable range

#### GET /api/v1/Activities/{id}
**Description**: Retrieve a specific activity by ID

**Test Scenarios**:

##### 2.1.3 Happy Path - Retrieve Activity by Valid ID
- **Method**: GET
- **Endpoint**: `/api/v1/Activities/1`
- **Expected Status Code**: 200
- **Expected Response**:
```json
{
  "id": 1,
  "title": "Activity 1",
  "dueDate": "2025-11-01T10:45:05.5030000+00:00",
  "completed": false
}
```
- **Validation**:
  - Response has required fields: id, title, dueDate, completed
  - id matches requested ID
  - All field types are correct

##### 2.1.4 Edge Case - Non-existent ID
- **Method**: GET
- **Endpoint**: `/api/v1/Activities/999999`
- **Expected Status Code**: 404
- **Expected Response**: Not Found or error message
- **Validation**:
  - Proper error handling for non-existent resources

##### 2.1.5 Edge Case - Invalid ID Format
- **Method**: GET
- **Endpoint**: `/api/v1/Activities/invalid`
- **Expected Status Code**: 400 or 404
- **Validation**:
  - Proper error handling for invalid input

##### 2.1.6 Edge Case - Negative ID
- **Method**: GET
- **Endpoint**: `/api/v1/Activities/-1`
- **Expected Status Code**: 400 or 404
- **Validation**:
  - Proper error handling for negative IDs

##### 2.1.7 Edge Case - Zero ID
- **Method**: GET
- **Endpoint**: `/api/v1/Activities/0`
- **Expected Status Code**: 404
- **Validation**:
  - Proper handling of boundary values

#### POST /api/v1/Activities
**Description**: Create a new activity

**Test Scenarios**:

##### 2.1.8 Happy Path - Create Valid Activity
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 0,
  "title": "New Activity",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": false
}
```
- **Expected Status Code**: 200 or 201
- **Expected Response**: Created activity object with assigned ID
- **Validation**:
  - Response contains all submitted fields
  - ID is generated/assigned
  - Response structure matches request structure

##### 2.1.9 Validation Test - Missing Required Field
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Body**:
```json
{
  "id": 0,
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": false
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Proper validation error message
  - Indicates missing required field

##### 2.1.10 Validation Test - Invalid Data Type
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Body**:
```json
{
  "id": "invalid",
  "title": "Test Activity",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": "not-a-boolean"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Type validation errors are reported

##### 2.1.11 Edge Case - Empty Title
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Body**:
```json
{
  "id": 0,
  "title": "",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": false
}
```
- **Expected Status Code**: 400 or 200 (depending on validation rules)
- **Validation**:
  - Check if empty strings are allowed

##### 2.1.12 Edge Case - Invalid Date Format
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Test Activity",
  "dueDate": "invalid-date",
  "completed": false
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Date format validation

##### 2.1.13 Edge Case - Null Values
- **Method**: POST
- **Endpoint**: `/api/v1/Activities`
- **Request Body**:
```json
{
  "id": 0,
  "title": null,
  "dueDate": null,
  "completed": null
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Null value handling

#### PUT /api/v1/Activities/{id}
**Description**: Update an existing activity

**Test Scenarios**:

##### 2.1.14 Happy Path - Update Existing Activity
- **Method**: PUT
- **Endpoint**: `/api/v1/Activities/1`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 1,
  "title": "Updated Activity",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": true
}
```
- **Expected Status Code**: 200
- **Expected Response**: Updated activity object
- **Validation**:
  - Response reflects updates
  - ID remains unchanged

##### 2.1.15 Edge Case - ID Mismatch
- **Method**: PUT
- **Endpoint**: `/api/v1/Activities/1`
- **Request Body**:
```json
{
  "id": 2,
  "title": "Updated Activity",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": true
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Error when path ID doesn't match body ID

##### 2.1.16 Edge Case - Update Non-existent Activity
- **Method**: PUT
- **Endpoint**: `/api/v1/Activities/999999`
- **Request Body**:
```json
{
  "id": 999999,
  "title": "Updated Activity",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "completed": true
}
```
- **Expected Status Code**: 404
- **Validation**:
  - Proper error for non-existent resource

#### DELETE /api/v1/Activities/{id}
**Description**: Delete an activity

**Test Scenarios**:

##### 2.1.17 Happy Path - Delete Existing Activity
- **Method**: DELETE
- **Endpoint**: `/api/v1/Activities/1`
- **Expected Status Code**: 200 or 204
- **Validation**:
  - Successful deletion confirmation

##### 2.1.18 Edge Case - Delete Non-existent Activity
- **Method**: DELETE
- **Endpoint**: `/api/v1/Activities/999999`
- **Expected Status Code**: 404
- **Validation**:
  - Proper error handling

##### 2.1.19 Edge Case - Delete Invalid ID
- **Method**: DELETE
- **Endpoint**: `/api/v1/Activities/invalid`
- **Expected Status Code**: 400 or 404
- **Validation**:
  - Proper error handling for invalid input

### 2.2 Authors Endpoints

#### GET /api/v1/Authors
**Description**: Retrieve all authors

**Test Scenarios**:

##### 2.2.1 Happy Path - Retrieve All Authors
- **Method**: GET
- **Endpoint**: `/api/v1/Authors`
- **Expected Status Code**: 200
- **Expected Response**: Array of author objects
- **Sample Response**:
```json
[
  {
    "id": 1,
    "idBook": 1,
    "firstName": "John",
    "lastName": "Doe"
  }
]
```
- **Validation**:
  - Response is an array
  - Each item has required fields: id, idBook, firstName, lastName
  - All field types are correct

##### 2.2.2 Response Structure Validation
- **Method**: GET
- **Endpoint**: `/api/v1/Authors`
- **Validation**:
  - Schema validation against OpenAPI specification
  - Field name consistency
  - Data type validation

#### GET /api/v1/Authors/{id}
**Description**: Retrieve a specific author by ID

**Test Scenarios**:

##### 2.2.3 Happy Path - Retrieve Author by Valid ID
- **Method**: GET
- **Endpoint**: `/api/v1/Authors/1`
- **Expected Status Code**: 200
- **Expected Response**:
```json
{
  "id": 1,
  "idBook": 1,
  "firstName": "John",
  "lastName": "Doe"
}
```

##### 2.2.4 Edge Case - Non-existent Author ID
- **Method**: GET
- **Endpoint**: `/api/v1/Authors/999999`
- **Expected Status Code**: 404

#### GET /api/v1/Authors/authors/books/{idBook}
**Description**: Retrieve authors by book ID

**Test Scenarios**:

##### 2.2.5 Happy Path - Retrieve Authors by Book ID
- **Method**: GET
- **Endpoint**: `/api/v1/Authors/authors/books/1`
- **Expected Status Code**: 200
- **Expected Response**: Array of authors for specified book
- **Validation**:
  - All returned authors have idBook matching the requested ID
  - Response is an array

##### 2.2.6 Edge Case - Book with No Authors
- **Method**: GET
- **Endpoint**: `/api/v1/Authors/authors/books/999999`
- **Expected Status Code**: 200 or 404
- **Expected Response**: Empty array or 404
- **Validation**:
  - Proper handling of books with no authors

#### POST /api/v1/Authors
**Description**: Create a new author

**Test Scenarios**:

##### 2.2.7 Happy Path - Create Valid Author
- **Method**: POST
- **Endpoint**: `/api/v1/Authors`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1,
  "firstName": "Jane",
  "lastName": "Smith"
}
```
- **Expected Status Code**: 200 or 201

##### 2.2.8 Validation Test - Missing Required Fields
- **Method**: POST
- **Endpoint**: `/api/v1/Authors`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1
}
```
- **Expected Status Code**: 400

##### 2.2.9 Edge Case - Invalid Book Reference
- **Method**: POST
- **Endpoint**: `/api/v1/Authors`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": -1,
  "firstName": "Jane",
  "lastName": "Smith"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Foreign key validation

#### PUT /api/v1/Authors/{id}
**Description**: Update an existing author

**Test Scenarios**:

##### 2.2.10 Happy Path - Update Existing Author
- **Method**: PUT
- **Endpoint**: `/api/v1/Authors/1`
- **Request Body**:
```json
{
  "id": 1,
  "idBook": 1,
  "firstName": "Jane",
  "lastName": "Smith-Updated"
}
```
- **Expected Status Code**: 200

#### DELETE /api/v1/Authors/{id}
**Description**: Delete an author

**Test Scenarios**:

##### 2.2.11 Happy Path - Delete Existing Author
- **Method**: DELETE
- **Endpoint**: `/api/v1/Authors/1`
- **Expected Status Code**: 200 or 204

### 2.3 Books Endpoints

#### GET /api/v1/Books
**Description**: Retrieve all books

**Test Scenarios**:

##### 2.3.1 Happy Path - Retrieve All Books
- **Method**: GET
- **Endpoint**: `/api/v1/Books`
- **Expected Status Code**: 200
- **Expected Response**: Array of book objects
- **Sample Response**:
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "description": "Book description",
    "pageCount": 100,
    "excerpt": "Book excerpt",
    "publishDate": "2025-11-01T10:45:05.503Z"
  }
]
```
- **Validation**:
  - Response is an array
  - Each book has required fields
  - pageCount is a positive integer
  - publishDate is valid ISO 8601 format

##### 2.3.2 Performance Test - Large Dataset
- **Method**: GET
- **Endpoint**: `/api/v1/Books`
- **Performance Criteria**:
  - Response time < 3000ms for large dataset
  - Memory usage within acceptable limits
- **Validation**:
  - API handles large datasets efficiently

#### GET /api/v1/Books/{id}
**Description**: Retrieve a specific book by ID

**Test Scenarios**:

##### 2.3.3 Happy Path - Retrieve Book by Valid ID
- **Method**: GET
- **Endpoint**: `/api/v1/Books/1`
- **Expected Status Code**: 200
- **Expected Response**:
```json
{
  "id": 1,
  "title": "Book Title",
  "description": "Book description",
  "pageCount": 100,
  "excerpt": "Book excerpt",
  "publishDate": "2025-11-01T10:45:05.503Z"
}
```

##### 2.3.4 Edge Case - Non-existent Book ID
- **Method**: GET
- **Endpoint**: `/api/v1/Books/999999`
- **Expected Status Code**: 404

##### 2.3.5 Edge Case - Invalid ID Format
- **Method**: GET
- **Endpoint**: `/api/v1/Books/abc123`
- **Expected Status Code**: 400 or 404

#### POST /api/v1/Books
**Description**: Create a new book

**Test Scenarios**:

##### 2.3.6 Happy Path - Create Valid Book
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 0,
  "title": "The Great Novel",
  "description": "An epic tale of adventure and discovery",
  "pageCount": 350,
  "excerpt": "In the beginning...",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 200 or 201

##### 2.3.7 Validation Test - Negative Page Count
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Test Book",
  "description": "Test description",
  "pageCount": -50,
  "excerpt": "Test excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Negative values should be rejected

##### 2.3.8 Validation Test - Zero Page Count
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Test Book",
  "description": "Test description",
  "pageCount": 0,
  "excerpt": "Test excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check if zero pages is valid

##### 2.3.9 Validation Test - Empty Title
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "",
  "description": "Test description",
  "pageCount": 100,
  "excerpt": "Test excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 400

##### 2.3.10 Edge Case - Very Long Title
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "A very long title that exceeds normal length expectations and tests the maximum field length validation rules that might be in place for the title field in the database schema",
  "description": "Test description",
  "pageCount": 100,
  "excerpt": "Test excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check maximum field length handling

##### 2.3.11 Edge Case - Special Characters in Fields
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Test <script>alert('XSS')</script>",
  "description": "Test & validation of \"special\" characters: <>&'",
  "pageCount": 100,
  "excerpt": "Test excerpt with symbols: @#$%^&*()",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 200 or 400
- **Validation**:
  - Special characters are properly escaped
  - XSS protection

##### 2.3.12 Edge Case - Future Publish Date
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Future Book",
  "description": "A book from the future",
  "pageCount": 100,
  "excerpt": "Test excerpt",
  "publishDate": "2099-12-31T23:59:59.000Z"
}
```
- **Expected Status Code**: 200
- **Validation**:
  - Future dates are accepted

##### 2.3.13 Edge Case - Very Large Page Count
- **Method**: POST
- **Endpoint**: `/api/v1/Books`
- **Request Body**:
```json
{
  "id": 0,
  "title": "Encyclopedia",
  "description": "A massive volume",
  "pageCount": 999999,
  "excerpt": "Test excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 200 or 400
- **Validation**:
  - Check maximum value handling

#### PUT /api/v1/Books/{id}
**Description**: Update an existing book

**Test Scenarios**:

##### 2.3.14 Happy Path - Update Existing Book
- **Method**: PUT
- **Endpoint**: `/api/v1/Books/1`
- **Request Body**:
```json
{
  "id": 1,
  "title": "Updated Book Title",
  "description": "Updated description",
  "pageCount": 350,
  "excerpt": "Updated excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 200

##### 2.3.15 Edge Case - Partial Update
- **Method**: PUT
- **Endpoint**: `/api/v1/Books/1`
- **Request Body**:
```json
{
  "id": 1,
  "title": "Only Title Updated"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check if partial updates are supported

##### 2.3.16 Edge Case - ID Mismatch
- **Method**: PUT
- **Endpoint**: `/api/v1/Books/1`
- **Request Body**:
```json
{
  "id": 2,
  "title": "Updated Book Title",
  "description": "Updated description",
  "pageCount": 350,
  "excerpt": "Updated excerpt",
  "publishDate": "2025-12-01T00:00:00.000Z"
}
```
- **Expected Status Code**: 400

#### DELETE /api/v1/Books/{id}
**Description**: Delete a book

**Test Scenarios**:

##### 2.3.17 Happy Path - Delete Existing Book
- **Method**: DELETE
- **Endpoint**: `/api/v1/Books/1`
- **Expected Status Code**: 200 or 204

##### 2.3.18 Edge Case - Delete Non-existent Book
- **Method**: DELETE
- **Endpoint**: `/api/v1/Books/999999`
- **Expected Status Code**: 404

##### 2.3.19 Edge Case - Double Delete
- **Method**: DELETE
- **Endpoint**: `/api/v1/Books/1`
- **Test Steps**:
  1. Delete book with ID 1
  2. Attempt to delete same book again
- **Expected Status Code (2nd delete)**: 404
- **Validation**:
  - Proper handling of already deleted resources

### 2.4 CoverPhotos Endpoints

#### GET /api/v1/CoverPhotos
**Description**: Retrieve all cover photos

**Test Scenarios**:

##### 2.4.1 Happy Path - Retrieve All Cover Photos
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos`
- **Expected Status Code**: 200
- **Expected Response**: Array of cover photo objects
- **Sample Response**:
```json
[
  {
    "id": 1,
    "idBook": 1,
    "url": "https://example.com/covers/book1.jpg"
  }
]
```

##### 2.4.2 Schema Validation
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos`
- **Validation**:
  - Each cover photo has id, idBook, url
  - URL format is valid
  - idBook references are valid integers

#### GET /api/v1/CoverPhotos/{id}
**Description**: Retrieve a specific cover photo by ID

**Test Scenarios**:

##### 2.4.3 Happy Path - Retrieve Cover Photo by Valid ID
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos/1`
- **Expected Status Code**: 200

##### 2.4.4 Edge Case - Non-existent Cover Photo ID
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos/999999`
- **Expected Status Code**: 404

#### GET /api/v1/CoverPhotos/books/covers/{idBook}
**Description**: Retrieve cover photos by book ID

**Test Scenarios**:

##### 2.4.5 Happy Path - Retrieve Cover Photos by Book ID
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos/books/covers/1`
- **Expected Status Code**: 200
- **Expected Response**: Array of cover photos for specified book
- **Validation**:
  - All returned photos have idBook matching requested ID

##### 2.4.6 Edge Case - Book with No Cover Photos
- **Method**: GET
- **Endpoint**: `/api/v1/CoverPhotos/books/covers/999999`
- **Expected Status Code**: 200 or 404
- **Expected Response**: Empty array or 404

#### POST /api/v1/CoverPhotos
**Description**: Create a new cover photo

**Test Scenarios**:

##### 2.4.7 Happy Path - Create Valid Cover Photo
- **Method**: POST
- **Endpoint**: `/api/v1/CoverPhotos`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1,
  "url": "https://example.com/covers/newbook.jpg"
}
```
- **Expected Status Code**: 200 or 201

##### 2.4.8 Validation Test - Invalid URL Format
- **Method**: POST
- **Endpoint**: `/api/v1/CoverPhotos`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1,
  "url": "not-a-valid-url"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - URL format validation

##### 2.4.9 Validation Test - Missing URL
- **Method**: POST
- **Endpoint**: `/api/v1/CoverPhotos`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1
}
```
- **Expected Status Code**: 400

##### 2.4.10 Edge Case - Invalid Book Reference
- **Method**: POST
- **Endpoint**: `/api/v1/CoverPhotos`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": -1,
  "url": "https://example.com/covers/test.jpg"
}
```
- **Expected Status Code**: 400

##### 2.4.11 Security Test - XSS in URL
- **Method**: POST
- **Endpoint**: `/api/v1/CoverPhotos`
- **Request Body**:
```json
{
  "id": 0,
  "idBook": 1,
  "url": "javascript:alert('XSS')"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Malicious URLs are rejected

#### PUT /api/v1/CoverPhotos/{id}
**Description**: Update an existing cover photo

**Test Scenarios**:

##### 2.4.12 Happy Path - Update Existing Cover Photo
- **Method**: PUT
- **Endpoint**: `/api/v1/CoverPhotos/1`
- **Request Body**:
```json
{
  "id": 1,
  "idBook": 1,
  "url": "https://example.com/covers/updated.jpg"
}
```
- **Expected Status Code**: 200

#### DELETE /api/v1/CoverPhotos/{id}
**Description**: Delete a cover photo

**Test Scenarios**:

##### 2.4.13 Happy Path - Delete Existing Cover Photo
- **Method**: DELETE
- **Endpoint**: `/api/v1/CoverPhotos/1`
- **Expected Status Code**: 200 or 204

### 2.5 Users Endpoints

#### GET /api/v1/Users
**Description**: Retrieve all users

**Test Scenarios**:

##### 2.5.1 Happy Path - Retrieve All Users
- **Method**: GET
- **Endpoint**: `/api/v1/Users`
- **Expected Status Code**: 200
- **Expected Response**: Array of user objects
- **Sample Response**:
```json
[
  {
    "id": 1,
    "userName": "john.doe",
    "password": "password123"
  }
]
```
- **Validation**:
  - Response is an array
  - Each user has required fields

##### 2.5.2 Security Test - Password Exposure
- **Method**: GET
- **Endpoint**: `/api/v1/Users`
- **Security Validation**:
  - Check if passwords are returned in plain text (security concern)
  - Passwords should be hashed or omitted from response

#### GET /api/v1/Users/{id}
**Description**: Retrieve a specific user by ID

**Test Scenarios**:

##### 2.5.3 Happy Path - Retrieve User by Valid ID
- **Method**: GET
- **Endpoint**: `/api/v1/Users/1`
- **Expected Status Code**: 200

##### 2.5.4 Edge Case - Non-existent User ID
- **Method**: GET
- **Endpoint**: `/api/v1/Users/999999`
- **Expected Status Code**: 404

#### POST /api/v1/Users
**Description**: Create a new user

**Test Scenarios**:

##### 2.5.5 Happy Path - Create Valid User
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Headers**:
  - Content-Type: application/json
- **Request Body**:
```json
{
  "id": 0,
  "userName": "newuser",
  "password": "SecurePass123!"
}
```
- **Expected Status Code**: 200 or 201

##### 2.5.6 Validation Test - Duplicate Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "john.doe",
  "password": "password123"
}
```
- **Expected Status Code**: 409 or 400
- **Validation**:
  - Duplicate usernames should be rejected

##### 2.5.7 Validation Test - Empty Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "",
  "password": "password123"
}
```
- **Expected Status Code**: 400

##### 2.5.8 Validation Test - Weak Password
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "testuser",
  "password": "123"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check if password strength is enforced

##### 2.5.9 Security Test - SQL Injection in Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "admin' OR '1'='1",
  "password": "password123"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - SQL injection attempts are blocked

##### 2.5.10 Security Test - XSS in Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "<script>alert('XSS')</script>",
  "password": "password123"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - XSS payloads are sanitized

##### 2.5.11 Edge Case - Special Characters in Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "user@#$%^&*()",
  "password": "password123"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check allowed characters in username

##### 2.5.12 Edge Case - Very Long Username
- **Method**: POST
- **Endpoint**: `/api/v1/Users`
- **Request Body**:
```json
{
  "id": 0,
  "userName": "a".repeat(1000),
  "password": "password123"
}
```
- **Expected Status Code**: 400
- **Validation**:
  - Maximum length validation

#### PUT /api/v1/Users/{id}
**Description**: Update an existing user

**Test Scenarios**:

##### 2.5.13 Happy Path - Update Existing User
- **Method**: PUT
- **Endpoint**: `/api/v1/Users/1`
- **Request Body**:
```json
{
  "id": 1,
  "userName": "john.doe.updated",
  "password": "NewPassword123!"
}
```
- **Expected Status Code**: 200

##### 2.5.14 Security Test - Password Change Validation
- **Method**: PUT
- **Endpoint**: `/api/v1/Users/1`
- **Request Body**:
```json
{
  "id": 1,
  "userName": "john.doe",
  "password": "weak"
}
```
- **Expected Status Code**: 400 or 200
- **Validation**:
  - Check if password strength is enforced on updates

#### DELETE /api/v1/Users/{id}
**Description**: Delete a user

**Test Scenarios**:

##### 2.5.15 Happy Path - Delete Existing User
- **Method**: DELETE
- **Endpoint**: `/api/v1/Users/1`
- **Expected Status Code**: 200 or 204

##### 2.5.16 Edge Case - Delete Non-existent User
- **Method**: DELETE
- **Endpoint**: `/api/v1/Users/999999`
- **Expected Status Code**: 404

## 3. Cross-Cutting Test Scenarios

### 3.1 Content Type Validation

#### 3.1.1 Invalid Content-Type Header
- **Test**: POST request with incorrect Content-Type
- **Endpoints**: All POST/PUT endpoints
- **Request Headers**:
  - Content-Type: text/plain
- **Expected Status Code**: 415 (Unsupported Media Type)

#### 3.1.2 Missing Content-Type Header
- **Test**: POST request without Content-Type
- **Endpoints**: All POST/PUT endpoints
- **Expected Status Code**: 400 or 415

### 3.2 HTTP Method Validation

#### 3.2.1 Unsupported HTTP Methods
- **Test**: Use unsupported methods on endpoints
- **Examples**:
  - PATCH /api/v1/Activities
  - HEAD /api/v1/Books
  - OPTIONS /api/v1/Users
- **Expected Status Code**: 405 (Method Not Allowed)

### 3.3 Request Size Limits

#### 3.3.1 Large Payload Test
- **Test**: Send extremely large request body
- **Endpoints**: All POST/PUT endpoints
- **Request Body**: Very large JSON (> 1MB)
- **Expected Status Code**: 413 (Payload Too Large) or 400

### 3.4 Rate Limiting

#### 3.4.1 Concurrent Requests
- **Test**: Send multiple simultaneous requests
- **Expected Behavior**:
  - All requests processed successfully OR
  - Rate limiting with 429 status code

#### 3.4.2 Burst Traffic
- **Test**: Send rapid sequential requests
- **Expected Behavior**:
  - Check if rate limiting is implemented
  - Monitor response times under load

### 3.5 CORS (Cross-Origin Resource Sharing)

#### 3.5.1 CORS Headers
- **Test**: Check CORS headers in responses
- **Validation**:
  - Access-Control-Allow-Origin header
  - Access-Control-Allow-Methods header
  - Access-Control-Allow-Headers header

#### 3.5.2 Preflight Requests
- **Test**: Send OPTIONS request
- **Expected Status Code**: 200 or 204
- **Expected Headers**: CORS headers present

### 3.6 Error Response Format

#### 3.6.1 Consistent Error Format
- **Test**: Verify error responses follow consistent format
- **Validation**:
  - Error messages are descriptive
  - Status codes are appropriate
  - Error response structure is consistent

### 3.7 Response Headers

#### 3.7.1 Security Headers
- **Test**: Check for security headers
- **Expected Headers**:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY or SAMEORIGIN
  - X-XSS-Protection: 1; mode=block
  - Content-Security-Policy (if applicable)

#### 3.7.2 Cache Control
- **Test**: Check cache control headers
- **Expected Headers**:
  - Cache-Control
  - ETag (if supported)
  - Last-Modified (if supported)

### 3.8 API Versioning

#### 3.8.1 Version in URL
- **Test**: Verify v1 in URL path
- **Validation**:
  - /api/v1/ prefix is consistent
  - Version is clearly indicated

#### 3.8.2 Invalid API Version
- **Test**: Request with invalid version
- **Example**: /api/v99/Activities
- **Expected Status Code**: 404

## 4. Performance Test Scenarios

### 4.1 Response Time

#### 4.1.1 Single Resource Retrieval
- **Metric**: Response time for GET /{resource}/{id}
- **Target**: < 500ms
- **Endpoints**: All GET by ID endpoints

#### 4.1.2 Collection Retrieval
- **Metric**: Response time for GET /{resource}
- **Target**: < 2000ms
- **Endpoints**: All GET collection endpoints

#### 4.1.3 Create Operation
- **Metric**: Response time for POST /{resource}
- **Target**: < 1000ms
- **Endpoints**: All POST endpoints

#### 4.1.4 Update Operation
- **Metric**: Response time for PUT /{resource}/{id}
- **Target**: < 1000ms
- **Endpoints**: All PUT endpoints

#### 4.1.5 Delete Operation
- **Metric**: Response time for DELETE /{resource}/{id}
- **Target**: < 500ms
- **Endpoints**: All DELETE endpoints

### 4.2 Load Testing

#### 4.2.1 Concurrent Users
- **Test**: 10, 50, 100 concurrent users
- **Metrics**:
  - Average response time
  - Error rate
  - Throughput (requests per second)

#### 4.2.2 Sustained Load
- **Test**: Constant load over extended period (30 minutes)
- **Metrics**:
  - Response time degradation
  - Memory leaks
  - Resource usage

### 4.3 Stress Testing

#### 4.3.1 Breaking Point
- **Test**: Gradually increase load until failure
- **Metrics**:
  - Maximum concurrent users
  - Failure point
  - Recovery time

### 4.4 Spike Testing

#### 4.4.1 Sudden Traffic Spike
- **Test**: Sudden increase in traffic
- **Metrics**:
  - Response to spike
  - Recovery time
  - Error rate during spike

## 5. Security Test Scenarios

### 5.1 Input Validation

#### 5.1.1 SQL Injection
- **Test**: Inject SQL commands in input fields
- **Examples**:
  - `'; DROP TABLE Users; --`
  - `' OR '1'='1`
- **Expected**: Proper escaping/rejection

#### 5.1.2 Cross-Site Scripting (XSS)
- **Test**: Inject JavaScript in text fields
- **Examples**:
  - `<script>alert('XSS')</script>`
  - `<img src=x onerror=alert('XSS')>`
- **Expected**: Proper sanitization

#### 5.1.3 XML External Entity (XXE)
- **Test**: If XML is accepted, test XXE vulnerabilities
- **Expected**: XML parsing is secure

#### 5.1.4 Command Injection
- **Test**: Inject system commands
- **Examples**:
  - `; ls -la`
  - `| cat /etc/passwd`
- **Expected**: Commands are not executed

### 5.2 Authentication & Authorization

#### 5.2.1 No Authentication Required
- **Observation**: API appears to have no authentication
- **Security Concern**: All endpoints are publicly accessible
- **Recommendation**: Document that this is a test API only

### 5.3 Data Exposure

#### 5.3.1 Sensitive Data in Responses
- **Test**: Check if sensitive data is exposed
- **Examples**:
  - Passwords in GET /Users responses
  - Internal IDs or system information
- **Expected**: Sensitive data is not exposed

#### 5.3.2 Error Messages
- **Test**: Check if error messages expose sensitive information
- **Expected**: Generic error messages, no stack traces

### 5.4 HTTPS/TLS

#### 5.4.1 Secure Connection
- **Test**: Verify HTTPS is used
- **Observation**: API uses HTTPS (https://fakerestapi.azurewebsites.net)
- **Validation**:
  - TLS version is current
  - Certificate is valid

#### 5.4.2 HTTP Downgrade
- **Test**: Attempt to connect via HTTP
- **Expected**: Redirect to HTTPS or connection refused

### 5.5 Mass Assignment

#### 5.5.1 Unauthorized Field Modification
- **Test**: Attempt to modify read-only fields
- **Example**: Modify 'id' field via PUT/POST
- **Expected**: Read-only fields are not modified

## 6. Integration Test Scenarios

### 6.1 Resource Relationships

#### 6.1.1 Book-Author Relationship
- **Test Sequence**:
  1. Create a book
  2. Create authors for that book
  3. Retrieve authors by book ID
  4. Verify relationship
- **Validation**:
  - Authors correctly associated with book
  - Book ID references are maintained

#### 6.1.2 Book-CoverPhoto Relationship
- **Test Sequence**:
  1. Create a book
  2. Create cover photos for that book
  3. Retrieve cover photos by book ID
  4. Verify relationship
- **Validation**:
  - Cover photos correctly associated with book
  - Book ID references are maintained

#### 6.1.3 Cascading Deletes
- **Test**: Delete a book and check related resources
- **Test Sequence**:
  1. Create a book
  2. Create related authors and cover photos
  3. Delete the book
  4. Check if related resources still exist
- **Validation**:
  - Determine if cascading delete is implemented
  - Orphaned records handling

### 6.2 Data Consistency

#### 6.2.1 Create-Read Consistency
- **Test Sequence**:
  1. POST to create resource
  2. GET to retrieve resource
  3. Verify data matches
- **Validation**:
  - Created data is immediately readable
  - All fields are preserved

#### 6.2.2 Update-Read Consistency
- **Test Sequence**:
  1. PUT to update resource
  2. GET to retrieve resource
  3. Verify updates are reflected
- **Validation**:
  - Updates are immediately visible
  - No data loss

#### 6.2.3 Delete Verification
- **Test Sequence**:
  1. DELETE resource
  2. GET to retrieve deleted resource
  3. Verify 404 response
- **Validation**:
  - Deleted resources are not accessible

## 7. Edge Cases and Boundary Testing

### 7.1 Numeric Boundaries

#### 7.1.1 Integer Overflow
- **Test**: Submit very large integer values
- **Examples**:
  - id: 2147483647 (max int32)
  - pageCount: 2147483647
- **Expected**: Proper handling or validation error

#### 7.1.2 Negative Numbers
- **Test**: Submit negative values where not expected
- **Examples**:
  - id: -1
  - pageCount: -100
- **Expected**: Validation error (400)

#### 7.1.3 Zero Values
- **Test**: Submit zero where it may not be valid
- **Examples**:
  - pageCount: 0
  - id: 0
- **Expected**: Appropriate validation

### 7.2 String Boundaries

#### 7.2.1 Empty Strings
- **Test**: Submit empty strings
- **Fields**: title, description, userName, etc.
- **Expected**: Validation error or acceptance (depends on rules)

#### 7.2.2 Very Long Strings
- **Test**: Submit strings exceeding reasonable length
- **Example**: 10,000 character title
- **Expected**: Validation error (400)

#### 7.2.3 Unicode Characters
- **Test**: Submit unicode characters
- **Examples**:
  - Emoji: 😀📚🎉
  - Special characters: Chinese, Arabic, etc.
- **Expected**: Proper encoding and storage

#### 7.2.4 Null vs Empty String
- **Test**: Distinguish between null and empty string
- **Validation**: API handles both correctly

### 7.3 Date Boundaries

#### 7.3.1 Past Dates
- **Test**: Submit very old dates
- **Example**: "1900-01-01T00:00:00.000Z"
- **Expected**: Acceptance or validation error

#### 7.3.2 Future Dates
- **Test**: Submit far future dates
- **Example**: "2099-12-31T23:59:59.000Z"
- **Expected**: Acceptance

#### 7.3.3 Invalid Date Formats
- **Test**: Submit invalid date formats
- **Examples**:
  - "2025-13-01" (invalid month)
  - "2025-02-30" (invalid day)
  - "not-a-date"
- **Expected**: Validation error (400)

### 7.4 Collection Operations

#### 7.4.1 Empty Collections
- **Test**: Retrieve collections when no data exists
- **Expected**: Empty array [] with 200 status

#### 7.4.2 Single Item Collection
- **Test**: Retrieve collection with exactly one item
- **Expected**: Array with one item

#### 7.4.3 Large Collections
- **Test**: Retrieve very large collections
- **Expected**: Efficient response, possible pagination

## 8. Test Execution Plan

### 8.1 Test Environment Setup

#### 8.1.1 Prerequisites
- Access to https://fakerestapi.azurewebsites.net
- API testing tool (Postman, REST Client, or automated framework)
- Test data prepared
- Network connectivity

#### 8.1.2 Test Data Preparation
- Prepare sample data for each resource type
- Prepare invalid data for negative tests
- Prepare edge case data

### 8.2 Test Execution Order

#### Phase 1: Smoke Tests (Priority: Critical)
1. Verify API is accessible
2. Test one endpoint per resource (GET all)
3. Verify basic functionality

#### Phase 2: Happy Path Tests (Priority: High)
1. Execute all happy path scenarios
2. Verify CRUD operations for each resource
3. Validate response structures

#### Phase 3: Negative Tests (Priority: High)
1. Execute validation tests
2. Test error handling
3. Test edge cases

#### Phase 4: Security Tests (Priority: High)
1. Execute security test scenarios
2. Test input validation
3. Check for vulnerabilities

#### Phase 5: Performance Tests (Priority: Medium)
1. Execute response time tests
2. Run load tests
3. Conduct stress tests

#### Phase 6: Integration Tests (Priority: Medium)
1. Test resource relationships
2. Verify data consistency
3. Test cascading operations

#### Phase 7: Boundary Tests (Priority: Low)
1. Test numeric boundaries
2. Test string boundaries
3. Test date boundaries

### 8.3 Test Automation Recommendations

#### 8.3.1 Automation Framework
- **Recommended**: Playwright for API testing or Jest with Supertest
- **Reason**: Good TypeScript support, matches project stack
- **Alternative**: Postman/Newman for quick setup

#### 8.3.2 Test Structure
```typescript
// Example test structure
describe('FakeRestAPI - Activities', () => {
  describe('GET /api/v1/Activities', () => {
    it('should return all activities', async () => {
      // Test implementation
    });
  });
  
  describe('POST /api/v1/Activities', () => {
    it('should create a new activity', async () => {
      // Test implementation
    });
    
    it('should reject invalid activity data', async () => {
      // Test implementation
    });
  });
});
```

#### 8.3.3 Test Data Management
- Use factories or builders for test data
- Generate random data with faker.js
- Clean up test data after execution (if applicable)

## 9. Test Metrics and Reporting

### 9.1 Key Metrics

#### 9.1.1 Test Coverage
- Total endpoints: 35+
- Endpoints tested: [Track progress]
- Test scenarios: 100+
- Pass rate: Target > 95%

#### 9.1.2 Defect Metrics
- Critical defects: [Count]
- High priority defects: [Count]
- Medium priority defects: [Count]
- Low priority defects: [Count]

#### 9.1.3 Performance Metrics
- Average response time: [Measure]
- 95th percentile response time: [Measure]
- Maximum response time: [Measure]
- Error rate: [Measure]

### 9.2 Test Report Template

#### 9.2.1 Summary
- Test execution date
- Total tests executed
- Tests passed
- Tests failed
- Pass percentage

#### 9.2.2 Detailed Results
- Results by endpoint
- Results by test category
- Failed test details
- Performance metrics

#### 9.2.3 Findings and Recommendations
- Critical issues found
- Security concerns
- Performance bottlenecks
- Recommendations for improvement

## 10. Risk Assessment

### 10.1 High Risk Areas

#### 10.1.1 Security Risks
- No authentication/authorization
- Potential data exposure (passwords in responses)
- Input validation concerns

#### 10.1.2 Data Integrity Risks
- No apparent data validation constraints
- Potential for data corruption
- Relationship integrity

### 10.2 Medium Risk Areas

#### 10.2.1 Performance Risks
- No apparent pagination on large datasets
- Potential performance degradation under load

#### 10.2.2 Usability Risks
- Error messages may not be descriptive enough
- Inconsistent response formats

### 10.3 Mitigation Strategies

#### 10.3.1 For Security Risks
- Document that this is a test API
- Recommend authentication for production use
- Implement input validation

#### 10.3.2 For Performance Risks
- Implement pagination
- Add caching where appropriate
- Monitor and optimize slow endpoints

## 11. Conclusion

This comprehensive test plan covers:
- **100+ test scenarios** across 5 main resource types (Activities, Authors, Books, CoverPhotos, Users)
- **Functional testing**: CRUD operations, validation, error handling
- **Security testing**: Input validation, XSS, SQL injection, data exposure
- **Performance testing**: Response times, load testing, stress testing
- **Integration testing**: Resource relationships, data consistency
- **Edge cases**: Boundary values, special characters, invalid inputs

### 11.1 Next Steps

1. **Review and approve** this test plan
2. **Set up test environment** and tools
3. **Implement automated tests** using recommended framework
4. **Execute tests** according to the execution plan
5. **Document results** and create test report
6. **Address findings** and retest as needed

### 11.2 Maintenance

- Update test plan when API changes
- Add new test scenarios based on defects found
- Review and update test data regularly
- Monitor API performance trends

### 11.3 Resources Required

- **Testing tool**: Postman, Playwright, or similar
- **Test automation**: TypeScript/Jest setup
- **Performance testing**: k6, JMeter, or Artillery
- **Time estimate**: 
  - Manual execution: 20-30 hours
  - Automation development: 40-60 hours
  - Maintenance: Ongoing

---

**Document Version**: 1.0  
**Created**: 2025-11-01  
**API Under Test**: FakeRestAPI v1  
**Status**: Ready for Review
