# Backend API Documentation

个人作品集网站后端 API 接口文档

## 基础信息

- **Base URL**: `https://your-domain.com/api`
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON

## 认证说明

对于需要认证的接口，需要在请求头中包含 JWT Token：

```
Authorization: Bearer <your_jwt_token>
```

---

## API 接口列表

### 1. 用户认证 (User Authentication)

#### 1.1 用户注册

- **接口**: `POST /api/users/register`
- **权限**: 公开
- **用途**: 注册新用户账号

**请求体**:
```json
{
  "username": "string (必填)",
  "email": "string (必填)",
  "password": "string (必填)"
}
```

**响应示例**:
```json
{
  "_id": "user_id",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_string"
}
```

---

#### 1.2 用户登录

- **接口**: `POST /api/users/login`
- **权限**: 公开
- **用途**: 用户登录，获取 JWT Token

**请求体**:
```json
{
  "email": "string (必填)",
  "password": "string (必填)"
}
```

**响应示例**:
```json
{
  "_id": "user_id",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_string"
}
```

---

#### 1.3 获取当前用户信息

- **接口**: `GET /api/users/me`
- **权限**: 需要认证
- **用途**: 获取当前登录用户的详细信息

**请求参数**: 无

**响应示例**:
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

### 2. 项目管理 (Projects)

#### 2.1 获取所有项目

- **接口**: `GET /api/projects`
- **权限**: 公开
- **用途**: 获取所有项目列表

**请求参数**: 无

**响应示例**:
```json
[
  {
    "_id": "project_id",
    "title": "项目标题",
    "description": "项目描述",
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

#### 2.2 获取单个项目

- **接口**: `GET /api/projects/:id`
- **权限**: 公开
- **用途**: 根据项目 ID 获取项目详情

**URL 参数**:
- `id`: 项目 ID (必填)

**响应示例**:
```json
{
  "_id": "project_id",
  "title": "项目标题",
  "description": "项目描述",
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

#### 2.3 创建新项目

- **接口**: `POST /api/projects`
- **权限**: 需要认证
- **用途**: 创建新的项目

**请求体**:
```json
{
  "title": "string (必填)",
  "description": "string (必填)",
  "imageUrl": "string (可选)",
  "repoUrl": "string (可选)",
  "liveUrl": "string (可选)"
}
```

**响应示例**:
```json
{
  "_id": "project_id",
  "title": "新项目",
  "description": "项目描述",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 2.4 更新项目

- **接口**: `PUT /api/projects/:id`
- **权限**: 需要认证（仅项目创建者）
- **用途**: 更新项目信息

**URL 参数**:
- `id`: 项目 ID (必填)

**请求体** (所有字段可选):
```json
{
  "title": "string",
  "description": "string",
  "imageUrl": "string",
  "repoUrl": "string",
  "liveUrl": "string"
}
```

**响应示例**:
```json
{
  "_id": "project_id",
  "title": "更新后的标题",
  "description": "更新后的描述",
  "imageUrl": "https://example.com/new-image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

---

#### 2.5 删除项目

- **接口**: `DELETE /api/projects/:id`
- **权限**: 需要认证（仅项目创建者）
- **用途**: 删除指定项目

**URL 参数**:
- `id`: 项目 ID (必填)

**响应示例**:
```json
{
  "message": "Project deleted successfully"
}
```

---

### 3. 博客管理 (Blog)

#### 3.1 获取所有博客文章

- **接口**: `GET /api/blog`
- **权限**: 公开
- **用途**: 获取所有博客文章列表

**请求参数**: 无

**响应示例**:
```json
[
  {
    "_id": "post_id",
    "title": "博客标题",
    "content": "博客内容",
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

#### 3.2 获取单篇博客文章

- **接口**: `GET /api/blog/:id`
- **权限**: 公开
- **用途**: 根据文章 ID 获取博客详情（包含评论）

**URL 参数**:
- `id`: 文章 ID (必填)

**响应示例**:
```json
{
  "_id": "post_id",
  "title": "博客标题",
  "content": "博客内容",
  "author": {
    "_id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "comments": [
    {
      "_id": "comment_id",
      "body": "评论内容",
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

#### 3.3 创建博客文章

- **接口**: `POST /api/blog`
- **权限**: 需要认证
- **用途**: 发布新的博客文章

**请求体**:
```json
{
  "title": "string (必填)",
  "content": "string (必填)"
}
```

**响应示例**:
```json
{
  "_id": "post_id",
  "title": "新博客",
  "content": "博客内容",
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

#### 3.4 更新博客文章

- **接口**: `PUT /api/blog/:id`
- **权限**: 需要认证（仅文章作者）
- **用途**: 更新博客文章内容

**URL 参数**:
- `id`: 文章 ID (必填)

**请求体** (所有字段可选):
```json
{
  "title": "string",
  "content": "string"
}
```

**响应示例**:
```json
{
  "_id": "post_id",
  "title": "更新后的标题",
  "content": "更新后的内容",
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

#### 3.5 删除博客文章

- **接口**: `DELETE /api/blog/:id`
- **权限**: 需要认证（仅文章作者）
- **用途**: 删除指定博客文章（同时删除所有评论）

**URL 参数**:
- `id`: 文章 ID (必填)

**响应示例**:
```json
{
  "message": "Blog post deleted successfully"
}
```

---

### 4. 评论管理 (Comments)

#### 4.1 获取文章评论

- **接口**: `GET /api/blog/:postId/comments`
- **权限**: 公开
- **用途**: 获取指定文章的所有评论

**URL 参数**:
- `postId`: 文章 ID (必填)

**响应示例**:
```json
[
  {
    "_id": "comment_id",
    "body": "评论内容",
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

#### 4.2 创建评论

- **接口**: `POST /api/blog/:postId/comments`
- **权限**: 需要认证
- **用途**: 为指定文章添加评论

**URL 参数**:
- `postId`: 文章 ID (必填)

**请求体**:
```json
{
  "body": "string (必填)"
}
```

**响应示例**:
```json
{
  "_id": "comment_id",
  "body": "评论内容",
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

### 5. 联系表单 (Contact)

#### 5.1 提交联系表单

- **接口**: `POST /api/contact`
- **权限**: 公开
- **用途**: 提交联系消息

**请求体**:
```json
{
  "name": "string (必填)",
  "email": "string (必填)",
  "message": "string (必填)"
}
```

**响应示例**:
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "message_id",
    "name": "张三",
    "email": "zhangsan@example.com",
    "message": "这是一条联系消息",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 5.2 获取所有联系消息

- **接口**: `GET /api/contact`
- **权限**: 需要认证（管理员）
- **用途**: 获取所有联系表单提交的消息

**请求参数**: 无

**响应示例**:
```json
[
  {
    "_id": "message_id",
    "name": "张三",
    "email": "zhangsan@example.com",
    "message": "这是一条联系消息",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 6. 健康检查 (Health Check)

#### 6.1 服务器健康检查

- **接口**: `GET /api/health`
- **权限**: 公开
- **用途**: 检查服务器运行状态

**请求参数**: 无

**响应示例**:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 错误响应格式

所有错误响应都遵循以下格式：

```json
{
  "message": "错误描述信息"
}
```

### 常见 HTTP 状态码

- `200 OK`: 请求成功
- `201 Created`: 资源创建成功
- `400 Bad Request`: 请求参数错误
- `401 Unauthorized`: 未授权，需要登录
- `403 Forbidden`: 没有权限访问
- `404 Not Found`: 资源不存在
- `500 Internal Server Error`: 服务器内部错误

---

## 技术栈

- **框架**: Express.js
- **数据库**: MongoDB (Mongoose)
- **认证**: JWT (jsonwebtoken)
- **安全**: Helmet, CORS
- **环境变量**: dotenv

---

## 环境配置

创建 `.env` 文件并配置以下环境变量：

```env
# MongoDB 连接字符串
MONGODB_URI=your_mongodb_connection_string

# JWT 密钥
JWT_SECRET=your_jwt_secret_key

# 服务器端口
PORT=5000

# 运行环境
NODE_ENV=development
```

---

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

### 生产环境部署
```bash
npm run deploy
```

---

## 部署说明

本项目已配置 Vercel 部署支持，`vercel.json` 配置文件已包含在项目中。

---

## 许可证

MIT License

---

## 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub: [https://github.com/zzzzzzssss123/backend-1](https://github.com/zzzzzzssss123/backend-1)
