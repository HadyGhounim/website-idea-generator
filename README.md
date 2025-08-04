# Website Idea Generator

A full-stack application that generates website sections from user ideas using Next.js, NestJS, and MongoDB.

## 🚀 Live Demo

[Add your deployed application URL here]

## ✨ Features

- 🎨 **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- 🚀 **Fast Backend**: NestJS API with MongoDB integration
- 🤖 **AI-Powered**: Generates website sections based on user ideas
- 💾 **Data Persistence**: Stores generated sections in MongoDB
- ⚡ **Real-time Preview**: Instant preview of generated sections
- 🔄 **Loading States**: Smooth loading animations and error handling
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Class Validator** - Input validation

## 📁 Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages and components
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page component
│   ├── package.json         # Frontend dependencies
│   └── ...
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── website-ideas/   # Website ideas feature module
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── schemas/     # MongoDB schemas
│   │   │   ├── website-ideas.controller.ts
│   │   │   ├── website-ideas.service.ts
│   │   │   └── website-ideas.module.ts
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   ├── package.json         # Backend dependencies
│   └── ...
└── package.json             # Root package.json for monorepo
```

## ⚙️ Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** - [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud service)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd New_Task
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Or install separately:
# Frontend
cd frontend && npm install

# Backend  
cd backend && npm install
```

### 3. Set Up MongoDB
**Option A: Local MongoDB**
1. Install MongoDB locally following the [official guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service
3. Create a database named `website-ideas`

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace the connection string in your `.env` file

### 4. Environment Configuration
```bash
# Copy the example environment file
cp backend/env.example backend/.env

# Edit the .env file with your MongoDB connection string
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/website-ideas

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/website-ideas

PORT=3001
```

### 5. Run the Application

**Development Mode (Recommended)**
```bash
# Run both frontend and backend simultaneously
npm run dev
```

**Or run separately:**
```bash
# Terminal 1 - Frontend (Next.js)
npm run dev:frontend
# Runs on http://localhost:3000

# Terminal 2 - Backend (NestJS)  
npm run dev:backend
# Runs on http://localhost:3001
```

### 6. Open Your Browser
Navigate to `http://localhost:3000` to see the application running!

## 📖 Usage Guide

1. **Enter a Website Idea**: Type your website concept (e.g., "Landing page for bakery", "E-commerce site for handmade jewelry")

2. **Generate Sections**: Click "Generate Sections" to create AI-powered website sections

3. **Preview Results**: View the generated sections including:
   - Hero section
   - About section
   - Contact section
   - Additional relevant sections

4. **Start Over**: Click "Start Over" to generate new sections for a different idea

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### POST `/website-ideas`
Create a new website idea and generate sections.

**Request:**
```json
{
  "idea": "Landing page for bakery"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "idea": "Landing page for bakery",
    "sections": [
      {
        "id": "section_1",
        "name": "Hero",
        "content": "Welcome to Sweet Dreams Bakery...",
        "order": 1
      },
      {
        "id": "section_2", 
        "name": "About",
        "content": "Our story begins with a passion for baking...",
        "order": 2
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET `/website-ideas`
Retrieve all website ideas.

#### GET `/website-ideas/:id`
Retrieve a specific website idea by ID.

## 🗄️ Database Schema

### WebsiteIdea Collection
```javascript
{
  _id: ObjectId,           // MongoDB document ID
  idea: String,            // User's website idea description
  sections: [              // Array of generated sections
    {
      id: String,          // Unique section identifier
      name: String,        // Section name (Hero, About, Contact, etc.)
      content: String,     // Generated content for the section
      order: Number        // Display order (1, 2, 3, etc.)
    }
  ],
  createdAt: Date,         // Document creation timestamp
  updatedAt: Date          // Last modification timestamp
}
```

## 🔧 Customization

### Adding New Section Types
1. Modify `backend/src/website-ideas/website-ideas.service.ts`
2. Add new section types to the `generateSections` method
3. Update the frontend to handle new section types

### Integrating Real AI Services
Replace the mock generation with actual AI API calls:
```typescript
// Example with OpenAI
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Use in generateSections method
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Generate content for a ${sectionName} section for a website about: ${idea}`,
  max_tokens: 200,
});
```

### Styling Customization
- **Global Styles**: Edit `frontend/app/globals.css`
- **Theme**: Modify `frontend/tailwind.config.js`
- **Components**: Update CSS classes in individual components

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check your Atlas connection string

**2. Port Already in Use**
```
Error: listen EADDRINUSE :::3001
```
**Solution**: Change the port in `backend/.env` or kill the process using the port

**3. CORS Error**
```
Access to fetch at 'http://localhost:3001/api/website-ideas' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution**: The backend is configured to allow CORS from the frontend origin

**4. Module Not Found**
```
Cannot find module 'axios'
```
**Solution**: Run `npm install` in the frontend directory

### Getting Help
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify MongoDB connection
4. Check environment variables

## 🧪 Testing

```bash
# Backend tests
cd backend && npm run test

# Frontend tests (if configured)
cd frontend && npm run test
```

## 📦 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
npm run start
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
npm run build
npm run start:prod
```

### Environment Variables for Production
```bash
MONGODB_URI=your_production_mongodb_uri
PORT=3001
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [NestJS](https://nestjs.com/) for the robust backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the flexible NoSQL database

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/your-repo/issues)
- **Email**: [your-email@example.com]
- **Documentation**: [Add your docs URL here]

---

⭐ **Star this repository if you found it helpful!** 