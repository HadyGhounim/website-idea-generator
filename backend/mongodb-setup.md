# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

1. **Sign up for MongoDB Atlas**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free" and create an account
   - Choose "Shared" cluster (free tier)

2. **Create a Cluster**:
   - Select "M0 Free" tier
   - Choose a cloud provider (AWS, Google Cloud, or Azure)
   - Select a region close to you
   - Click "Create"

3. **Set up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Username: `website-ideas-user`
   - Password: Create a strong password
   - Role: "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `website-ideas`

6. **Update .env file**:
   Replace the MONGODB_URI in your .env file with the Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://website-ideas-user:yourpassword@cluster.mongodb.net/website-ideas
   ```

## Option 2: Local MongoDB Installation

1. **Download MongoDB Community Server**:
   - Go to https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB Service**:
   - MongoDB should start automatically as a Windows service
   - If not, open Services and start "MongoDB" service

## Option 3: Docker (if Docker is installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Test the Connection

After setting up MongoDB, run:
```bash
node test-mongodb.js
```

You should see "✅ MongoDB connected successfully!" if everything is working. 