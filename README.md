# Backend API Documentation

Personal Portfolio Website Backend API Documentation

## Basic Information

- **Base URL**: `https://your-domain.com/api`
- **Authentication**: Bearer Token (JWT)
- **Response Format**: JSON

## Authentication

For endpoints requiring authentication, include JWT Token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### 1. User Authentication

#### 1.1 Register User

- **Endpoint**: `POST /api/users/register`
- **Access**: Public
- **Purpose**: Register a new user account

**Request Body**:
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Example**:
```json
{
  "_id": "user_id",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_string"
}
```

---

#### 1.2 User Login

- **Endpoint**: `POST /api/users/login`
- **Access**: Public
- **Purpose**: User login to obtain JWT Token

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Example**:
```json
{
  "_id": "user_id",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_string"
}
```

---

#### 1.3 Get Current User

- **Endpoint**: `GET /api/users/me`
- **Access**: Authentication Required
- **Purpose**: Get detailed information of the currently logged-in user

**Request Parameters**: None

**Response Example**:
```json
{
  "_id": "user_id",
  "username": "testuser",
  "email": "test@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Project Management

#### 2.1 Get All Projects

- **Endpoint**: `GET /api/projects`
- **Access**: Public
- **Purpose**: Get list of all projects

**Request Parameters**: None

**Response Example**:
```json
[
  {
    "_id": "project_id",
    "title": "Project Title",
    "description": "Project Description",
    "imageUrl": "https://example.com/image.jpg",
    "repoUrl": "https://github.com/user/repo",
    "liveUrl": "https://example.com",
    "user": {
      "_id": "user_id",
      "username": "testuser",
      "email": "test@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### 2.2 Get Single Project

- **Endpoint**: `GET /api/projects/:id`
- **Access**: Public
- **Purpose**: Get project details by project ID

**URL Parameters**:
- `id`: Project ID (required)

**Response Example**:
```json
{
  "_id": "project_id",
  "title": "Project Title",
  "description": "Project Description",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "user": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 2.3 Create New Project

- **Endpoint**: `POST /api/projects`
- **Access**: Authentication Required
- **Purpose**: Create a new project

**Request Body**:
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "imageUrl": "string (optional)",
  "repoUrl": "string (optional)",
  "liveUrl": "string (optional)"
}
```

**Response Example**:
```json
{
  "_id": "project_id",
  "title": "New Project",
  "description": "Project Description",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 2.4 Update Project

- **Endpoint**: `PUT /api/projects/:id`
- **Access**: Authentication Required (Project Creator Only)
- **Purpose**: Update project information

**URL Parameters**:
- `id`: Project ID (required)

**Request Body** (all fields optional):
```json
{
  "title": "string",
  "description": "string",
  "imageUrl": "string",
  "repoUrl": "string",
  "liveUrl": "string"
}
```

**Response Example**:
```json
{
  "_id": "project_id",
  "title": "Updated Title",
  "description": "Updated Description",
  "imageUrl": "https://example.com/new-image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

---

#### 2.5 Delete Project

- **Endpoint**: `DELETE /api/projects/:id`
- **Access**: Authentication Required (Project Creator Only)
- **Purpose**: Delete specified project

**URL Parameters**:
- `id`: Project ID (required)

**Response Example**:
```json
{
  "message": "Project deleted successfully"
}
```

---

### 3. Blog Management

#### 3.1 Get All Blog Posts

- **Endpoint**: `GET /api/blog`
- **Access**: Public
- **Purpose**: Get list of all blog posts

**Request Parameters**: None

**Response Example**:
```json
[
  {
    "_id": "post_id",
    "title": "Blog Title",
    "content": "Blog Content",
    "author": {
      "_id": "user_id",
      "username": "testuser",
      "email": "test@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### 3.2 Get Single Blog Post

- **Endpoint**: `GET /api/blog/:id`
- **Access**: Public
- **Purpose**: Get blog post details by post ID (including comments)

**URL Parameters**:
- `id`: Post ID (required)

**Response Example**:
```json
{
  "_id": "post_id",
  "title": "Blog Title",
  "content": "Blog Content",
  "author": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "comments": [
    {
      "_id": "comment_id",
      "body": "Comment Content",
      "author": {
        "_id": "user_id",
        "username": "commenter",
        "email": "commenter@example.com"
      },
      "post": "post_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 3.3 Create Blog Post

- **Endpoint**: `POST /api/blog`
- **Access**: Authentication Required
- **Purpose**: Publish a new blog post

**Request Body**:
```json
{
  "title": "string (required)",
  "content": "string (required)"
}
```

**Response Example**:
```json
{
  "_id": "post_id",
  "title": "New Blog",
  "content": "Blog Content",
  "author": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 3.4 Update Blog Post

- **Endpoint**: `PUT /api/blog/:id`
- **Access**: Authentication Required (Post Author Only)
- **Purpose**: Update blog post content

**URL Parameters**:
- `id`: Post ID (required)

**Request Body** (all fields optional):
```json
{
  "title": "string",
  "content": "string"
}
```

**Response Example**:
```json
{
  "_id": "post_id",
  "title": "Updated Title",
  "content": "Updated Content",
  "author": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

---

#### 3.5 Delete Blog Post

- **Endpoint**: `DELETE /api/blog/:id`
- **Access**: Authentication Required (Post Author Only)
- **Purpose**: Delete specified blog post (also deletes all comments)

**URL Parameters**:
- `id`: Post ID (required)

**Response Example**:
```json
{
  "message": "Blog post deleted successfully"
}
```

---

### 4. Comment Management

#### 4.1 Get Post Comments

- **Endpoint**: `GET /api/blog/:postId/comments`
- **Access**: Public
- **Purpose**: Get all comments for specified post

**URL Parameters**:
- `postId`: Post ID (required)

**Response Example**:
```json
[
  {
    "_id": "comment_id",
    "body": "Comment Content",
    "author": {
      "_id": "user_id",
      "username": "commenter",
      "email": "commenter@example.com"
    },
    "post": "post_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### 4.2 Create Comment

- **Endpoint**: `POST /api/blog/:postId/comments`
- **Access**: Authentication Required
- **Purpose**: Add a comment to specified post

**URL Parameters**:
- `postId`: Post ID (required)

**Request Body**:
```json
{
  "body": "string (required)"
}
```

**Response Example**:
```json
{
  "_id": "comment_id",
  "body": "Comment Content",
  "author": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "post": "post_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 5. Contact Form

#### 5.1 Submit Contact Form

- **Endpoint**: `POST /api/contact`
- **Access**: Public
- **Purpose**: Submit contact message

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "message": "string (required)"
}
```

**Response Example**:
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "message_id",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a contact message",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 5.2 Get All Contact Messages

- **Endpoint**: `GET /api/contact`
- **Access**: Authentication Required (Admin)
- **Purpose**: Get all contact form submissions

**Request Parameters**: None

**Response Example**:
```json
[
  {
    "_id": "message_id",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a contact message",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 6. Health Check

#### 6.1 Server Health Check

- **Endpoint**: `GET /api/health`
- **Access**: Public
- **Purpose**: Check server running status

**Request Parameters**: None

**Response Example**:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: No permission to access
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server internal error

---

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS
- **Environment Variables**: dotenv

---

## Environment Configuration

Create a `.env` file and configure the following environment variables:

```env
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# JWT secret key
JWT_SECRET=your_jwt_secret_key

# Server port
PORT=5000

# Runtime environment
NODE_ENV=development
```

---

## Local Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

### Production Deployment
```bash
npm run deploy
```

---

## Deployment Instructions

This project is configured for Vercel deployment with the `vercel.json` configuration file included.

---

## License

MIT License

---

## Contact

For questions or suggestions, please contact via:
- GitHub: [https://github.com/zzzzzzssss123/backend-1](https://github.com/zzzzzzssss123/backend-1)
