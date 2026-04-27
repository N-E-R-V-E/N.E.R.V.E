# Cynlr Inspired App - Setup & Usage Guide

## Overview

This is a standalone Next.js application with a complete backend API, admin dashboard, and frontend pages for managing news articles and founder profiles.

## Features

### ✅ Completed
- **Theme Switching**: Light/dark mode with system preference detection
- **Admin Dashboard**: Full CRUD for news and founders at `/admin`
- **News Management**: Create, edit, delete articles with pagination
- **Founders Management**: Manage founder profiles with expertise and social links
- **Backend API**: RESTful endpoints with JWT authentication
- **Database**: SQLite with proper schema and migrations
- **Responsive Design**: Mobile-friendly UI with Cynlr-inspired aesthetics

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file:
```env
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL=sqlite:./data/app.db
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Access Admin Dashboard
Navigate to `http://localhost:3000/admin`

**First Time Setup:**
- Click "No account? Register" to create an admin account
- Use any email and password
- Once logged in, you can manage all content

## Admin Dashboard

### Features
- **News Management**: Add, edit, delete articles
- **Founders Management**: Add, edit, delete founder profiles
- **Real-time Updates**: All changes persist to the database immediately
- **Authentication**: JWT-based login system

### How to Use

#### Adding News Articles
1. Go to `/admin`
2. Click on the "news" tab
3. Fill in title, description, content, author, and image URL
4. Click "Add Article"

#### Adding Founders
1. Go to `/admin`
2. Click on the "founders" tab
3. Fill in name, role, bio, and image URL
4. Click "Add Founder"

#### Editing Content
- Click the "Edit" button on any item
- Make changes and click "Save"
- Or click "Delete" to remove

## API Endpoints

### Authentication
- `POST /api/auth` - Login/Register
  - Body: `{ action: "login" | "register", email, password }`

### News
- `GET /api/news` - Get all published news
- `POST /api/news` - Create news (admin only)
  - Header: `Authorization: Bearer {token}`
  - Body: `{ title, description, content, imageUrl, author }`
- `GET /api/news/[id]` - Get single article
- `PUT /api/news/[id]` - Update article (admin only)
- `DELETE /api/news/[id]` - Delete article (admin only)

### Founders
- `GET /api/founders` - Get all founders
- `POST /api/founders` - Create founder (admin only)
  - Header: `Authorization: Bearer {token}`
  - Body: `{ name, role, bio, imageUrl, expertise: [], socialLinks: {} }`
- `GET /api/founders/[id]` - Get single founder
- `PUT /api/founders/[id]` - Update founder (admin only)
- `DELETE /api/founders/[id]` - Delete founder (admin only)

## File Structure

```
app/
  ├── admin/                 # Admin dashboard
  ├── api/                   # Backend API routes
  │   ├── auth/             # Authentication
  │   ├── news/             # News management
  │   └── founders/         # Founders management
  ├── founder/              # Founders page
  ├── news/                 # News page
  └── page.tsx              # Home page

components/
  ├── AdminDashboardNew.tsx # Admin dashboard component
  ├── Navigation.tsx        # Navigation bar
  └── ThemeProvider.tsx     # Theme switching

lib/
  ├── db.ts                 # Database initialization
  ├── auth.ts               # Authentication utilities
  └── ...

data/
  └── app.db                # SQLite database (auto-created)
```

## Database

The app uses SQLite with the following tables:
- `users` - Admin accounts
- `news` - News articles
- `founders` - Founder profiles
- `workshops` - Workshops/events (for future use)
- `gallery` - Gallery items (for future use)
- `downloads` - Downloadable files (for future use)

Database file is stored at `data/app.db` and is automatically created on first run.

## Customization

### Theme Colors
Edit `app/globals.css` to customize:
- `--bg` - Background color
- `--text` - Text color
- `--accent` - Accent color (green in Cynlr style)
- `--border` - Border color

### Animations
All animations are defined in `app/globals.css`:
- `fadeUp` - Fade and slide up
- `textReveal` - Text reveal effect
- `scaleIn` - Scale in effect
- `glow` - Glow effect

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `JWT_SECRET` to a strong random string
- Update `DATABASE_URL` if using a different database
- Set `NODE_ENV=production`

## Troubleshooting

### Database Issues
If you encounter database errors:
1. Delete the `data/app.db` file
2. Restart the dev server
3. The database will be recreated automatically

### Admin Login Issues
- Make sure you've registered an account first
- Check that cookies are enabled in your browser
- Clear browser cache and try again

### API Errors
- Check that the dev server is running
- Verify the API endpoint URL is correct
- Check the browser console for error messages

## Next Steps

### To Add More Features:
1. **Image Upload**: Integrate with S3 or Cloudinary
2. **Email Notifications**: Send emails when content is updated
3. **User Roles**: Add different permission levels
4. **Content Scheduling**: Schedule posts for future publication
5. **Analytics**: Track page views and user engagement

### To Deploy:
1. Choose a hosting provider (Vercel, Netlify, Railway, etc.)
2. Set up environment variables
3. Connect your repository
4. Deploy with one click

## Support

For issues or questions, check the browser console for error messages and verify:
- Dev server is running
- Database file exists at `data/app.db`
- Environment variables are set correctly
- API endpoints are accessible

---

**Built with Next.js, React, Tailwind CSS, and SQLite**
