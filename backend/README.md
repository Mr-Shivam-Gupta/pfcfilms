# PFC Films Backend API

Backend API for PFC Films website built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pfcfilms
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

3. Make sure MongoDB is running on your system.

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin (initial setup)
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current admin (protected)

### Productions
- `GET /api/productions` - Get all productions
- `GET /api/productions/:id` - Get single production
- `POST /api/productions` - Create production (protected)
- `PUT /api/productions/:id` - Update production (protected)
- `DELETE /api/productions/:id` - Delete production (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (protected)
- `PUT /api/courses/:id` - Update course (protected)
- `DELETE /api/courses/:id` - Delete course (protected)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single gallery item
- `POST /api/gallery` - Create gallery item (protected)
- `PUT /api/gallery/:id` - Update gallery item (protected)
- `DELETE /api/gallery/:id` - Delete gallery item (protected)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contacts (protected)
- `GET /api/contact/:id` - Get single contact (protected)
- `PUT /api/contact/:id` - Update contact (protected)
- `DELETE /api/contact/:id` - Delete contact (protected)

### Celebrities
- `GET /api/celebrities` - Get all celebrities
- `GET /api/celebrities/:id` - Get single celebrity
- `POST /api/celebrities` - Create celebrity (protected)
- `PUT /api/celebrities/:id` - Update celebrity (protected)
- `DELETE /api/celebrities/:id` - Delete celebrity (protected)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

### Awards
- `GET /api/awards` - Get all awards
- `GET /api/awards/:id` - Get single award
- `POST /api/awards` - Create award (protected)
- `PUT /api/awards/:id` - Update award (protected)
- `DELETE /api/awards/:id` - Delete award (protected)

### About
- `GET /api/about` - Get about content
- `POST /api/about` - Create/Update about content (protected)
- `PUT /api/about` - Update about content (protected)

### Stats
- `GET /api/stats` - Get all stats
- `POST /api/stats` - Create stat (protected)
- `PUT /api/stats/:id` - Update stat (protected)
- `DELETE /api/stats/:id` - Delete stat (protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics (protected)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Initial Admin Setup

To create the first admin account, use the register endpoint:
```bash
POST /api/auth/register
{
  "username": "admin",
  "email": "admin@pfcfilms.com",
  "password": "your_password"
}
```
