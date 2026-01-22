# PFC Films API - Postman Collection

This Postman collection contains all the API endpoints for the PFC Films backend.

## Import Instructions

1. Open Postman
2. Click **Import** button (top left)
3. Select the file: `PFC_Films_API.postman_collection.json`
4. The collection will be imported with all endpoints organized in folders

## Collection Structure

### 1. **Authentication**
- Register Admin - Create first admin account
- Login Admin - Login and get JWT token (auto-saves token)
- Get Current Admin - Get logged-in admin details

### 2. **Productions**
- Get All Productions (with filters)
- Get Single Production
- Create Production (Admin only)
- Update Production (Admin only)
- Delete Production (Admin only)

### 3. **Courses**
- Get All Courses (with filters)
- Get Single Course
- Create Course (Admin only)
- Update Course (Admin only)
- Delete Course (Admin only)

### 4. **Gallery**
- Get All Gallery Items (with filters)
- Get Single Gallery Item
- Create Gallery Item - Photo (Admin only)
- Create Gallery Item - Video (Admin only)
- Update Gallery Item (Admin only)
- Delete Gallery Item (Admin only)

### 5. **Contact**
- Submit Contact Form (Public - no auth required)
- Get All Contacts (Admin only)
- Get Single Contact (Admin only)
- Update Contact Status (Admin only)
- Delete Contact (Admin only)

### 6. **Celebrities**
- Get All Celebrities (with filters)
- Get Single Celebrity
- Create Celebrity (Admin only)
- Update Celebrity (Admin only)
- Delete Celebrity (Admin only)

### 7. **Testimonials**
- Get All Testimonials (with filters)
- Get Single Testimonial
- Create Testimonial (Admin only)
- Update Testimonial (Admin only)
- Delete Testimonial (Admin only)

### 8. **Awards**
- Get All Awards (with filters)
- Get Single Award
- Create Award (Admin only)
- Update Award (Admin only)
- Delete Award (Admin only)

### 9. **About**
- Get About Content
- Create/Update About Content (Admin only)
- Update About Content (Admin only)

### 10. **Stats**
- Get All Stats
- Create Stat (Admin only)
- Update Stat (Admin only)
- Delete Stat (Admin only)

### 11. **Services**
- Get All Services (with filters)
- Get Single Service
- Create Service (Admin only)
- Update Service (Admin only)
- Delete Service (Admin only)

### 12. **Admin**
- Get Dashboard Stats (Admin only)

### 13. **Health Check**
- Health Check (Public - no auth required)

## Collection Variables

The collection uses these variables:

- `baseUrl` - Default: `http://localhost:5000/api`
- `adminToken` - Auto-populated after login (stored in collection variable)

## Authentication

### Automatic Token Management

1. **Login** to get a token:
   - Use "Login Admin" request
   - Token is automatically saved to `adminToken` variable
   - All protected endpoints use this token automatically

2. **Manual Token Setup** (if needed):
   - Go to Collection settings
   - Edit the `adminToken` variable
   - Paste your JWT token

### Bearer Token Authentication

All protected endpoints use Bearer token authentication. The collection is configured to automatically use the `adminToken` variable.

## Usage Tips

### 1. First Time Setup

1. Start your backend server: `cd backend && npm run dev`
2. Import the collection
3. Use "Register Admin" to create your first admin account
4. Use "Login Admin" to get your token (auto-saved)

### 2. Testing Public Endpoints

- Health Check - No authentication needed
- Submit Contact Form - No authentication needed
- All GET endpoints for Productions, Courses, Gallery, etc. - No authentication needed

### 3. Testing Admin Endpoints

- Make sure you're logged in (token is set)
- All POST, PUT, DELETE endpoints require authentication
- Token is automatically included in requests

### 4. Using Filters

Many GET endpoints support query parameters:
- `category` - Filter by category
- `featured` - Filter featured items (true/false)
- `status` - Filter by status
- `type` - Filter by type (for gallery: photo/video)
- `academy` - Filter by academy (for courses)
- `level` - Filter by level (for courses)

### 5. Updating Variables

To change the base URL:
1. Click on the collection name
2. Go to "Variables" tab
3. Update `baseUrl` value
4. Save

## Example Workflow

1. **Health Check** - Verify server is running
2. **Register Admin** - Create admin account (first time only)
3. **Login Admin** - Get JWT token (auto-saved)
4. **Create Production** - Add a new production
5. **Get All Productions** - View all productions
6. **Update Production** - Modify a production
7. **Get Dashboard Stats** - View admin dashboard statistics

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Notes

- Replace `:id` in URL paths with actual IDs from your database
- All timestamps are in ISO 8601 format
- Image URLs should be valid URLs (can be placeholder URLs for testing)
- Required fields are marked in the request body examples
- Optional fields can be omitted

## Troubleshooting

### Token Not Working
- Make sure you've logged in recently
- Check if token has expired (tokens expire after 7 days)
- Re-login to get a new token

### 401 Unauthorized
- Verify token is set in collection variables
- Make sure you're logged in
- Check if endpoint requires authentication

### 404 Not Found
- Verify the ID exists in database
- Check if endpoint URL is correct
- Ensure server is running

### 500 Server Error
- Check server logs
- Verify MongoDB connection
- Ensure all required fields are provided
