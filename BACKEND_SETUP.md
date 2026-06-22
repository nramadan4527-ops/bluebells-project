# 🚀 Bluebells Backend Setup Guide

## Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **MongoDB** (Local or Cloud) - Download from [mongodb.com](https://www.mongodb.com)
- **npm** (comes with Node.js)

## 📋 Step-by-Step Setup

### 1. Install Node.js Dependencies

```bash
cd backend
npm install
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install and run MongoDB:
   ```bash
   mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string

### 3. Configure Environment Variables

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bluebells
JWT_SECRET=bluebells_secret_key_2026
NODE_ENV=development
```

### 4. Start the Backend Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

### 5. Test the API

Health check:
```bash
curl http://localhost:5000/api/health
```

## 📱 Frontend Integration

### Include API Files in HTML

Add these scripts to your HTML `<head>`:

```html
<script src="api.js"></script>
<script src="cart-manager.js"></script>
<script src="auth-manager.js"></script>
```

### Updated Frontend Files

Include the new files in your project:
- `api.js` - API client library
- `cart-manager.js` - Shopping cart management
- `auth-manager.js` - Authentication management

### Update Shop Page

The shop page now uses the backend API:

```javascript
// Get products from backend
ProductAPI.getAll().then(products => {
  console.log("Products:", products);
  renderProducts(products);
});

// Add to cart (now includes product ID)
addToCart(product);

// Create order
OrderAPI.create({
  customer: {
    name: "Ahmed",
    phone: "01234567890",
    address: "Cairo"
  },
  items: cart,
  total: getCartTotal()
});
```

## 🔐 Admin Login

### Register First Admin

Make a POST request to register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@bluebells.com",
    "password": "admin123"
  }'
```

### Login

Use the login endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@bluebells.com",
    "role": "admin"
  }
}
```

## 🛒 Common API Operations

### Get All Products
```javascript
ProductAPI.getAll().then(products => console.log(products));
```

### Search Products
```javascript
ProductAPI.search("necklace").then(results => console.log(results));
```

### Create Product (Admin)
```javascript
ProductAPI.create({
  name: "Beautiful Ring",
  price: 50,
  description: "Handmade with love",
  image: "data:image/...",
  category: "Jewelry",
  stock: 10
}, token).then(response => console.log(response));
```

### Create Order
```javascript
OrderAPI.create({
  customer: {
    name: "Ahmed",
    email: "ahmed@email.com",
    phone: "01234567890",
    address: "Cairo, Egypt"
  },
  items: [
    { name: "Ring", price: 50, quantity: 2 }
  ],
  total: 100
}).then(response => console.log(response));
```

### Get Order by Phone
```javascript
OrderAPI.getByPhone("01234567890").then(orders => console.log(orders));
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running (`mongod`)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill process using port 5000

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Make sure frontend is using `http://localhost:5000`

### JWT Token Expired
```
Error: Invalid or expired token
```
**Solution:** Login again to get a new token

## 📚 Project Structure

```
bluebells/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Admin.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── auth.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── api.js
├── cart-manager.js
├── auth-manager.js
└── (frontend files...)
```

## 🚢 Deployment

### Deploy Backend to Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create app:
   ```bash
   heroku create bluebells-api
   ```
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Deploy Frontend to GitHub Pages/Netlify

1. Push frontend to GitHub
2. Deploy via GitHub Pages or Netlify

## 🤝 Support

For more help, check:
- Backend README: `backend/README.md`
- API Documentation: `backend/README.md`
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com

## ✅ Next Steps

1. ✅ Install backend dependencies
2. ✅ Start MongoDB
3. ✅ Run backend server
4. ✅ Create admin account
5. ✅ Add products via admin panel
6. ✅ Test frontend with real API

Happy coding! 🎉
