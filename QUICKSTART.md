# 🚀 Quick Start Guide - Bluebells with Backend

## 📦 What You Got

A complete full-stack e-commerce system with:
- ✅ Node.js/Express backend
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Product management API
- ✅ Order processing
- ✅ Admin dashboard

## ⚡ Quick Setup (5 minutes)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run installer
- Keep default settings
- MongoDB will start automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

### 4. Test Backend is Working
Open browser: http://localhost:5000/api/health

Should return:
```json
{
  "status": "✅ Server is running",
  "timestamp": "2026-06-22T..."
}
```

## 🔐 Create Admin Account

Open Terminal and run:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@bluebells.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "message": "Admin registered successfully",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@bluebells.com"
  }
}
```

## 🌐 Open Frontend

### Option 1: Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

### Option 2: Use Python
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 3: Use Node
```bash
npx http-server
```

## 🛍️ Test the Flow

1. **Open Home Page** → http://localhost:8000 (or live server port)
2. **Go to Shop** → See empty products (that's normal)
3. **Login as Admin** → Click "Admin" → Use admin/admin123
4. **Add Products** → Use admin panel to add items
5. **Shop** → Go back to shop, products appear
6. **Add to Cart** → Select items
7. **Checkout** → Fill info and place order
8. **Confirmation** → See order confirmation

## 📁 File Structure

```
backend/
├── server.js           ← Main server file
├── package.json        ← Dependencies
├── .env               ← Configuration
├── models/            ← Database schemas
├── controllers/       ← Business logic
├── routes/            ← API endpoints
└── middleware/        ← Authentication

(root)
├── api.js            ← API client library
├── cart-manager.js   ← Cart logic
├── auth-manager.js   ← Login logic
├── shop-api.js       ← Use instead of shop.js
├── checkout-api.js   ← Use instead of checkout.js
├── admin-api.js      ← Use instead of admin.js
├── admin-login.html  ← New login page
└── (other HTML files)
```

## 📝 Update HTML Files

To use the backend API, update your HTML files to use the API versions:

**shop.html**: Replace `shop.js` with `shop-api.js`
```html
<script src="api.js"></script>
<script src="cart-manager.js"></script>
<script src="shop-api.js"></script>  <!-- Changed -->
```

**checkout.html**: Replace `checkout.js` with `checkout-api.js`
```html
<script src="api.js"></script>
<script src="cart-manager.js"></script>
<script src="checkout-api.js"></script>  <!-- Changed -->
```

**confirmation.html**: Replace `confirmation.js` with `confirmation-api.js`
```html
<script src="confirmation-api.js"></script>  <!-- Changed -->
```

**admin.html**: Replace `admin.js` with `admin-api.js`
```html
<script src="api.js"></script>
<script src="auth-manager.js"></script>
<script src="admin-api.js"></script>  <!-- Changed -->
```

**Use admin-login.html** instead of the old login page

## 🔑 Default Credentials

After running the curl command above:
- **Username**: admin
- **Password**: admin123

## 🛠️ Common Issues

### "MongoDB Connection Error"
→ Make sure `mongod` is running

### "Port 5000 already in use"
→ Change PORT in `.env` or kill the process

### "Products not showing"
→ Make sure backend is running on http://localhost:5000

### "Login not working"
→ Check admin account was created with curl command

## 📚 Next Steps

1. ✅ Read `BACKEND_SETUP.md` for detailed setup
2. ✅ Read `backend/README.md` for API documentation
3. ✅ Deploy to production (Heroku, AWS, etc.)
4. ✅ Setup cloud MongoDB (Atlas)
5. ✅ Add payment integration (Stripe, PayPal)

## 🚀 Production Deployment

To deploy your backend to production:

### Heroku
```bash
heroku login
heroku create bluebells-api
heroku config:set MONGODB_URI=your_cloud_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Other Platforms
- **Railway.app** - Simple deployment
- **Render.com** - Free tier available
- **AWS EC2** - Scalable option
- **DigitalOcean** - Affordable VPS

## 💡 Pro Tips

1. **Use Postman** for testing API endpoints
2. **Keep backend running** while developing
3. **Check console** for errors
4. **Use `npm run dev`** for development (auto-restart)
5. **Keep JWT secret** safe in `.env`

## 🆘 Need Help?

Check these files:
- `BACKEND_SETUP.md` - Detailed backend setup
- `backend/README.md` - API documentation
- `backend/.env` - Configuration
- Browser console for errors

Happy coding! 🎉
