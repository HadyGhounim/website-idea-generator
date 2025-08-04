# Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)

## Quick Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Set up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `website-ideas`

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### 3. Configure Environment
```bash
# Copy the example environment file
cp backend/env.example backend/.env

# Edit backend/.env with your MongoDB connection string
# For local: MONGODB_URI=mongodb://localhost:27017/website-ideas
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/website-ideas
```

### 4. Start the Application
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Frontend: npm run dev:frontend (http://localhost:3000)
# Backend: npm run dev:backend (http://localhost:3001)
```

## Verify Installation

1. Open http://localhost:3000
2. Enter a website idea (e.g., "Landing page for bakery")
3. Click "Generate Sections"
4. You should see 3 generated sections (Hero, About, Contact)

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string in `.env` file
- Ensure network access (for Atlas)

### Port Conflicts
- Frontend: Change port in `frontend/package.json`
- Backend: Change PORT in `.env` file

### CORS Issues
- Backend CORS is configured for `http://localhost:3000`
- Update CORS origin in `backend/src/main.ts` if needed 