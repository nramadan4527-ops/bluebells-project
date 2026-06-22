# 💙 Bluebells - Full Stack E-Commerce Platform

A complete full-stack e-commerce system for selling handmade accessories with admin dashboard, order management, and real-time inventory.

## 🌟 Features

### Frontend
- 🛍️ **Product Shop** - Browse and search accessories
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- 💳 **Checkout** - Secure order placement
- ✅ **Order Confirmation** - Track orders with confirmation animation
- 👤 **Admin Dashboard** - Manage products (Add/Edit/Delete)
- 📱 **Responsive Design** - Works on mobile, tablet, desktop

### Backend
- 🔐 **JWT Authentication** - Secure admin login with 24-hour tokens
- 📦 **Product Management** - Full CRUD operations
- 📋 **Order Processing** - Create, track, and manage orders
- 🔍 **Search & Filter** - Find products by name/description
- ⚡ **RESTful API** - Clean API design with public/protected routes
- 🛡️ **Data Validation** - MongoDB schema validation
- 🔗 **CORS Enabled** - Cross-origin request support

## 📋 Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- localStorage for client-side data
- Responsive CSS Grid & Flexbox

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

### 1. Install Backend
```bash
cd backend
npm install
```

### 2. Configure Environment
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bluebells
JWT_SECRET=bluebells_secret_key_2026
NODE_ENV=development
```

### 3. Start MongoDB
```bash
mongod
```

### 4. Run Backend
```bash
npm run dev
```

Backend running at: http://localhost:5000

### 5. Open Frontend
Use Live Server or:
```bash
python -m http.server 8000
```

Frontend at: http://localhost:8000

## 📁 Project Structure

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
│
├── api.js              ← API client library
├── cart-manager.js     ← Cart management
├── auth-manager.js     ← Authentication logic
│
├── index.html          ← Home page
├── shop.html           → Use with shop-api.js
├── product.html        → Product detail
├── cart.html           → Shopping cart
├── checkout.html       → Use with checkout-api.js
├── confirmation.html   → Use with confirmation-api.js
│
├── admin.html          → Use with admin-api.js
├── admin-login.html    → Admin authentication
│
├── -api.js files       ← Backend integration versions
│
├── QUICKSTART.md       ← Quick setup guide
├── BACKEND_SETUP.md    ← Detailed backend setup
└── README.md           ← This file
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?query=necklace` - Search products
- `POST /api/products` - Create (admin only)
- `PUT /api/products/:id` - Update (admin only)
- `DELETE /api/products/:id` - Delete (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/search?phone=123456` - Get orders by phone
- `GET /api/orders` - Get all (admin only)
- `PUT /api/orders/:id` - Update status (admin only)
- `DELETE /api/orders/:id` - Cancel (admin only)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin
- `GET /api/auth/verify` - Verify token

### Health
- `GET /api/health` - Server status

## 🔐 Authentication

### Get Admin Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Use Token in Requests
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Database Models

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String (base64),
  category: String,
  stock: Number,
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number,
  status: String, // Pending, Processing, Shipped, Delivered
  paymentMethod: String,
  paymentStatus: String,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin
```javascript
{
  _id: ObjectId,
  username: String,
  password: String (hashed),
  email: String,
  role: String, // admin, superadmin
  permissions: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development

### Start Development Server
```bash
npm run dev
```

Auto-restarts on file changes.

### Production Build
```bash
npm start
```

## 🐛 Troubleshooting

### MongoDB Won't Connect
```
Error: connect ECONNREFUSED
```
→ Run `mongod` to start MongoDB

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
→ Change PORT in `.env` or kill process

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
→ Make sure backend is on `http://localhost:5000`

### JWT Token Expired
```
Error: Invalid or expired token
```
→ Login again to get new token

## 📚 Usage Examples

### Create Product (Frontend)
```javascript
const product = {
  name: "Diamond Ring",
  price: 150,
  description: "Beautiful handmade ring",
  image: imageBase64,
  category: "Jewelry",
  stock: 10
};

const response = await ProductAPI.create(product, token);
```

### Create Order (Frontend)
```javascript
const orderData = {
  customer: {
    name: "Ahmed",
    phone: "01234567890",
    address: "Cairo"
  },
  items: cart,
  total: 500
};

const response = await OrderAPI.create(orderData);
```

### Search Products (Frontend)
```javascript
const results = await ProductAPI.search("necklace");
```

## 🚀 Deployment

### Docker
```bash
docker-compose up
```

### Heroku
```bash
heroku create bluebells-api
heroku config:set MONGODB_URI=mongodb+srv://...
git push heroku main
```

### Railway, Render, AWS, etc.
See `BACKEND_SETUP.md` for detailed deployment guides.

## 📝 Configuration

### Environment Variables
```env
PORT=5000                                          # Server port
MONGODB_URI=mongodb://localhost:27017/bluebells   # Database URL
JWT_SECRET=bluebells_secret_key_2026              # JWT secret
NODE_ENV=development                              # Environment
```

## 🔄 Frontend-Backend Integration

### Without Backend (LocalStorage)
- Products stored locally
- Cart stored in localStorage
- No order persistence

### With Backend (Recommended)
1. Include API files in HTML:
```html
<script src="api.js"></script>
<script src="cart-manager.js"></script>
<script src="auth-manager.js"></script>
```

2. Use API versions of JavaScript:
   - `shop-api.js` instead of `shop.js`
   - `checkout-api.js` instead of `checkout.js`
   - `admin-api.js` instead of `admin.js`

## 💡 Best Practices

1. **Keep `.env` safe** - Don't commit to Git
2. **Use JWT tokens** - For admin operations only
3. **Validate data** - On both frontend and backend
4. **Hash passwords** - Already done with bcryptjs
5. **Use CORS carefully** - Restrict to frontend domain in production
6. **Monitor MongoDB** - Check for slow queries
7. **Log errors** - For debugging in production

## 📖 Documentation

- [Quick Start Guide](QUICKSTART.md) - 5-minute setup
- [Backend Setup](BACKEND_SETUP.md) - Detailed backend guide
- [API Reference](backend/README.md) - Full API documentation

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

## 📄 License

MIT License - Feel free to use for commercial projects

## 🆘 Support

- Check documentation files
- Review browser console for errors
- Check backend server logs
- Test with Postman/curl

## 🎉 Enjoy!

Build amazing things with Bluebells! 💙

---

**Made with ❤️ for handmade accessories lovers**
