# Project TODO - Cynlr Inspired App (Standalone)

## Phase 1: Remove Manus Dependencies
- [x] Remove all Manus OAuth and authentication code
- [x] Remove Manus API references and imports
- [x] Clean up server/_core directory (remove Manus-specific files)
- [x] Remove Manus environment variables
- [x] Update package.json to remove Manus packages

## Phase 2: UI Redesign & Theme Fixing
- [x] Fix light/dark theme switching to support manual toggle and system preference detection
- [x] Redesign color palette inspired by Cynlr.com (add green accents, refine dark mode)
- [x] Update globals.css with new color variables
- [x] Add 2D and 3D animations site-wide (text reveals, fade-ins, scroll effects)
- [x] Refine hero section with better imagery and animations (keep close to current state)
- [x] Fix system page visibility and routing (make /admin route accessible)

## Phase 3: Backend Setup with Database
- [x] Set up SQLite database
- [x] Create database schema for news articles, founders, workshops, gallery, downloads
- [x] Build API routes for CRUD operations (/api/news, /api/founders, /api/auth)
- [x] Create authentication middleware for admin routes
- [x] Set up environment variables for database connection

## Phase 4: Admin Dashboard - Full Site Control
- [x] Build admin dashboard with real authentication (JWT-based)
- [x] Implement content management for news articles (create, read, update, delete)
- [x] Implement content management for founder profiles (create, read, update, delete)
- [ ] Add image upload functionality (local or cloud storage) - Future enhancement
- [ ] Add file download management (upload, delete, serve files) - Future enhancement
- [x] Create dashboard for managing hero section content
- [ ] Create dashboard for managing workshops/events - Future enhancement
- [ ] Create dashboard for managing gallery items - Future enhancement
- [ ] Create dashboard for managing downloads - Future enhancement
- [x] Implement real-time content editing with database persistence

## Phase 5: News Section Enhancement
- [x] Create database schema for news articles
- [x] Build news article detail/inside view page
- [x] Implement "View More" pagination or load-more feature
- [x] Connect news page to backend API
- [x] Add more sample articles to the database (via admin dashboard)

## Phase 6: Founders Page Redesign
- [x] Create database schema for founder profiles
- [x] Redesign founders page with better layout and visual hierarchy
- [x] Create founder profile cards with images, bios, and social links
- [x] Add expertise chips and skills display
- [x] Implement founder detail/profile view
- [x] Connect founders page to backend API

## Phase 7: Content Pages Integration
- [x] Update hero section to use managed content from admin dashboard
- [x] Update news section to display articles from database
- [x] Update founders section to display profiles from database
- [ ] Update workshops section to display events from database - Future enhancement
- [ ] Update gallery section to display items from database - Future enhancement
- [ ] Update downloads section to serve files from storage - Future enhancement

## Phase 8: Animations & Performance
- [x] Add smooth page transitions
- [x] Add scroll-triggered animations
- [ ] Optimize images and assets - Ongoing
- [ ] Implement lazy loading - Ongoing
- [x] Add loading states and skeletons

## Phase 9: Testing & Delivery
- [x] Test admin dashboard CRUD operations
- [x] Test authentication and authorization
- [x] Test all content pages display correctly
- [ ] Test responsive design on mobile/tablet - Manual testing needed
- [x] Test theme switching
- [ ] Performance testing and optimization - Ongoing

---

## Completed Features ✅

### Backend Infrastructure
- SQLite database with 7 tables (users, news, founders, workshops, gallery, downloads, heroContent)
- JWT-based authentication system
- Password hashing with bcryptjs
- RESTful API endpoints with proper error handling
- Role-based access control (admin-only operations)

### Admin Dashboard
- Full CRUD for news articles
- Full CRUD for founder profiles
- Real-time database persistence
- Secure login/register system
- Clean, dark-themed interface

### Frontend Pages
- Home page with hero section
- News page with pagination and detail views
- Founders page with profile cards and detail views
- All pages fetch data from backend API

### UI/UX Enhancements
- Light/dark theme switching with system preference detection
- Cynlr-inspired color palette (green accents, dark backgrounds)
- Smooth animations (text reveals, fade-ins, scale effects)
- Responsive design
- Professional, modern interface

### API Endpoints
- POST /api/auth - Register/Login
- GET /api/news - Get all news
- POST /api/news - Create news (admin)
- PUT /api/news/[id] - Update news (admin)
- DELETE /api/news/[id] - Delete news (admin)
- GET /api/founders - Get all founders
- POST /api/founders - Create founder (admin)
- PUT /api/founders/[id] - Update founder (admin)
- DELETE /api/founders/[id] - Delete founder (admin)

---

## Future Enhancements (Not in Scope)

- [ ] S3 image upload integration
- [ ] Email notifications for admin actions
- [ ] Advanced user roles and permissions
- [ ] Content scheduling
- [ ] Analytics dashboard
- [ ] Search functionality
- [ ] Comments/feedback system
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
- [ ] CDN integration
- [ ] Database migration to PostgreSQL
- [ ] Backup and restore functionality

---

## Deployment Checklist

Before deploying to production:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Migrate from SQLite to PostgreSQL or MySQL
- [ ] Set up proper environment variables
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Add rate limiting to API endpoints
- [ ] Set up monitoring and logging
- [ ] Add error tracking (Sentry, etc.)
- [ ] Test all features thoroughly
- [ ] Set up CI/CD pipeline
- [ ] Configure auto-scaling if needed

---

**Status:** ✅ READY FOR TESTING & DEPLOYMENT
**Last Updated:** 2026-04-27
**Version:** 1.0.0
