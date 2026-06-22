# Bluebells Backend API

Node.js/Express backend for the Bluebells accessories store with MongoDB integration.

## 📦 Installation

```bash
npm install
```

## 🚀 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000`

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bluebells
JWT_SECRET=bluebells_secret_key_2026
NODE_ENV=development
```

## 🔌 API Endpoints

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **GET** `/api/products/search?query=...` - Search products
- **POST** `/api/products` - Create product (admin only)
- **PUT** `/api/products/:id` - Update product (admin only)
- **DELETE** `/api/products/:id` - Delete product (admin only)

### Orders
- **POST** `/api/orders` - Create order
- **GET** `/api/orders/:id` - Get order by ID
- **GET** `/api/orders/search?phone=...` - Get orders by phone number
- **GET** `/api/orders` - Get all orders (admin only)
- **PUT** `/api/orders/:id` - Update order status (admin only)
- **DELETE** `/api/orders/:id` - Cancel order (admin only)

### Authentication
- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/register` - Register admin (admin only)
- **GET** `/api/auth/verify` - Verify JWT token

### Health Check
- **GET** `/api/health` - Server status

## 🔐 Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## 📊 Database Models

### Product
```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
  inStock: Boolean,
  timestamps
}
```

### Order
```javascript
{
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: Array,
  total: Number,
  status: String (Pending, Processing, Shipped, Delivered, Cancelled),
  paymentMethod: String,
  paymentStatus: String,
  trackingNumber: String,
  timestamps
}
```

### Admin
```javascript
{
  username: String,
  password: String (hashed),
  email: String,
  role: String,
  permissions: Object,
  timestamps
}
```

## 🛠️ Setup MongoDB

### Local Installation
Download MongoDB from https://www.mongodb.com/try/download/community

### Using MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update `.env`

### Start MongoDB (local)
```bash
mongod
```

## 📤 Example Requests

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Necklace","price":50,"image":"url","category":"Jewelry"}'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer":{"name":"Ahmed","phone":"01234567890","address":"Cairo"},
    "items":[{"name":"Ring","price":30,"quantity":1}],
    "total":30
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

## 📝 Notes

- JWT tokens expire after 24 hours
- Passwords are hashed with bcryptjs
- CORS is enabled for frontend requests
- All timestamps are in UTC

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

**JWT Token Errors:**
- Ensure Authorization header is correct format
- Check token expiration
- Verify JWT_SECRET matches in .env

**CORS Issues:**
- Update frontend to use http://localhost:5000
- Verify cors() middleware is enabled

## 📚 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin requests
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Dev auto-reload
