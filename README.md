# 🌐 InterviewSphere - AI-Powered Interview Preparation Platform

> **Transform your interview preparation with AI-powered learning. Generate role-specific questions, get detailed explanations, and organize your practice sessions efficiently.**

## ✨ Features

### 🎯 **Smart Interview Preparation**
- **Role-Based Questions**: Tailored questions for Frontend, Backend, Data Science, UI/UX, and more
- **Experience Level Adaptation**: Questions customized to your years of experience
- **Topic Focus**: Specify areas you want to concentrate on (e.g., React, MongoDB, Python)
- **AI-Generated Content**: Powered by Google's Gemini AI for relevant, up-to-date questions

### 🤖 **AI-Powered Learning**
- **Dynamic Q&A Generation**: Create personalized interview sessions with 10+ questions
- **Concept Explanations**: Deep-dive explanations for any question with "Learn More" feature
- **Smart Prompts**: Context-aware AI responses based on your role and experience
- **Continuous Learning**: Generate additional questions to expand your practice

### 📚 **Session Management**
- **Organized Practice**: Save and organize interview sessions by role and technology
- **Progress Tracking**: Monitor your preparation with session history and Q&A counts
- **Pin Important Questions**: Mark and prioritize key questions for focused practice
- **Personal Notes**: Add your own insights and notes to questions

### 🎨 **Modern User Experience**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Interface**: Clean, modern UI with smooth animations
- **Profile Management**: Upload profile pictures and manage account settings
- **Real-time Updates**: Instant feedback and live session management

## 🏗️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React.js | 18.0+ |
| **Styling** | Tailwind CSS | 3.0+ |
| **State Management** | React Context API | Built-in |
| **Routing** | React Router | 6.0+ |
| **Backend** | Node.js + Express.js | 18.0+ |
| **Database** | MongoDB | 6.0+ |
| **AI Engine** | Google Gemini AI | 2.0 Flash Lite |
| **Authentication** | JWT (JSON Web Tokens) | 9.0+ |
| **File Upload** | Multer | 2.0+ |
| **Image Processing** | Sharp | Latest |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **MongoDB** database (local or cloud)
- **Google AI Studio** account for Gemini API key
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/interviewsphere.git
cd interviewsphere
```

### 2. Backend Setup
```bash
cd Backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials
```

**Environment Variables Required:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_key_here
MONGO_URI=mongodb://localhost:27017/interviewsphere
PORT=8000
```

### 3. Frontend Setup
```bash
cd Frontend/interview-preparation
npm install
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend/interview-preparation
npm run dev
```

## 🔧 Configuration

### Gemini AI Setup
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

### MongoDB Setup
1. **Local Installation**: Install MongoDB Community Edition
2. **Cloud Option**: Use [MongoDB Atlas](https://mongodb.com/atlas) for free tier
3. Update `MONGO_URI` in your `.env` file

### JWT Secret
Generate a secure random string for JWT token signing:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📱 Usage Guide

### Creating Your First Session
1. **Sign Up/Login**: Create an account or sign in
2. **Start New Session**: Click the "Add New" button
3. **Fill Details**:
   - Target Role (e.g., Frontend Developer)
   - Years of Experience
   - Topics to Focus On
   - Description (optional)
4. **Generate Questions**: AI creates 10 personalized questions
5. **Practice & Learn**: Use "Learn More" for detailed explanations

### Managing Sessions
- **View All Sessions**: Dashboard shows all your interview prep sessions
- **Add More Questions**: Generate additional Q&A for any session
- **Pin Important Questions**: Mark questions for focused practice
- **Track Progress**: Monitor your preparation journey

### Environment Variables for Production
```env
GEMINI_API_KEY=your_production_gemini_key
JWT_SECRET=your_production_jwt_secret
MONGO_URI=your_production_mongodb_uri
NODE_ENV=production
```

## 🔒 Security Features

- **JWT Authentication**: Secure user sessions
- **Password Hashing**: bcrypt encryption for user passwords
- **Environment Variables**: Sensitive data never committed to Git
- **CORS Protection**: Configured for production security
- **Input Validation**: Server-side validation for all user inputs

## 📁 Project Structure

```
interviewsphere/
├── Backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Authentication & upload middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── uploads/            # User profile images
│   ├── utils/              # AI prompts and utilities
│   └── server.js           # Main server file
├── Frontend/               # React frontend
│   └── interview-preparation/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       ├── context/        # React context providers
│       ├── utils/          # Utility functions
│       └── src/            # Main source code
├── .gitignore              # Git ignore rules
└── README.md               # This file
```


## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify environment variables in `.env`
- Ensure port 8000 is available

**Frontend can't connect to backend:**
- Verify backend is running on port 8000
- Check CORS configuration
- Ensure API endpoints are correct

**AI questions not generating:**
- Verify Gemini API key is valid
- Check API quota and limits
- Review backend logs for errors

**Profile image upload fails:**
- Check uploads directory permissions
- Verify file size limits
- Ensure image format is supported (JPG, PNG)


## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile/image` - Update profile image

### Sessions
- `POST /api/sessions/create` - Create interview session
- `GET /api/sessions/my-sessions` - Get user sessions
- `GET /api/sessions/:id` - Get session details
- `DELETE /api/sessions/:id` - Delete session

### AI Features
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/generate-explanation` - Get concept explanations

### Questions
- `POST /api/questions/add` - Add questions to session
- `POST /api/questions/:id/pin` - Pin/unpin question
- `PUT /api/questions/:id/note` - Update question notes



