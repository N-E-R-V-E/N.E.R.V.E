# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Start the Dev Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### 2. Access the Admin Dashboard
Navigate to `http://localhost:3000/admin`

### 3. Create Your First Admin Account
- Click "No account? Register"
- Enter any email and password
- Click "Register"
- You're now logged in!

---

## 📝 What You Can Do

### In the Admin Dashboard
- **Add News Articles**: Click the "news" tab, fill in the form, and click "Add Article"
- **Add Founders**: Click the "founders" tab, fill in the form, and click "Add Founder"
- **Edit Content**: Click "Edit" on any item to modify it
- **Delete Content**: Click "Delete" to remove items

### On the Frontend
- **View News**: Go to `/news` to see all articles with pagination
- **Read Articles**: Click any article to read the full content
- **View Founders**: Go to `/founder` to see all founder profiles
- **View Details**: Click any founder to see their full profile

---

## 🎨 Features

✅ **Light/Dark Theme** - Toggle in the top navigation  
✅ **Admin Dashboard** - Full content management  
✅ **News Section** - Articles with pagination  
✅ **Founders Page** - Team profiles with expertise  
✅ **Responsive Design** - Works on all devices  
✅ **Smooth Animations** - Modern, polished UI  
✅ **Database Persistence** - All changes are saved  

---

## 🔑 Default Admin Account

You can create your own account by registering in the admin dashboard. No pre-set credentials needed!

---

## 📚 Sample Data

To test the app:
1. Go to `/admin`
2. Register an account
3. Add a few news articles
4. Add a few founders
5. Visit `/news` and `/founder` to see them displayed

---

## 🛠️ API Endpoints

All API endpoints are available at `/api/`:

- `POST /api/auth` - Login/Register
- `GET /api/news` - Get all news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/[id]` - Update news (admin)
- `DELETE /api/news/[id]` - Delete news (admin)
- `GET /api/founders` - Get all founders
- `POST /api/founders` - Create founder (admin)
- `PUT /api/founders/[id]` - Update founder (admin)
- `DELETE /api/founders/[id]` - Delete founder (admin)

---

## 🧪 Testing Checklist

- [ ] Admin registration works
- [ ] Can add news articles
- [ ] Can edit news articles
- [ ] Can delete news articles
- [ ] News page displays articles
- [ ] Article pagination works
- [ ] Can view article details
- [ ] Can add founders
- [ ] Can edit founders
- [ ] Can delete founders
- [ ] Founders page displays profiles
- [ ] Can view founder details
- [ ] Theme switching works
- [ ] Responsive design on mobile
- [ ] All animations are smooth

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🆘 Troubleshooting

**Admin login not working?**
- Make sure you registered first
- Check that cookies are enabled
- Clear browser cache

**Database errors?**
- Delete `data/app.db`
- Restart the dev server
- Database will be recreated automatically

**API not responding?**
- Check dev server is running
- Verify endpoint URLs are correct
- Check browser console for errors

---

## 📖 Full Documentation

See `README_SETUP.md` for complete setup instructions and API documentation.

---

**Ready to test? Start the dev server and visit `http://localhost:3000/admin`!**
