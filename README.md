# 🎓 Coaching Management App

Full-stack coaching management system built with React and Node.js/Express.

## 📁 Project Structure

```
coaching-management-app/
├── backend/    # Node.js/Express API
├── frontend/   # React frontend
├── package.json                    # Root workspace scripts
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd coaching-management-app
```

2. **Install all dependencies**
```bash
npm run install:all
```

3. **Configure environment variables**

Backend:
```bash
cd backend
cp .env.example .env.development
# Edit .env.development with your MongoDB connection string
```

Frontend:
```bash
cd frontend
cp .env.example .env.development
# Edit if needed (default: http://localhost:5010)
```

4. **Run the application**
```bash
# From root directory - runs both frontend and backend
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## 📜 Available Scripts

### Root Level
- `npm run install:all` - Install all dependencies (root, backend, frontend)
- `npm run dev` - Run both backend and frontend concurrently
- `npm run dev:backend` - Run backend only
- `npm run dev:frontend` - Run frontend only
- `npm run build:frontend` - Build frontend for production
- `npm run clean` - Remove all node_modules

### Backend (cd backend)
- `npm run dev` - Development mode with auto-reload
- `npm start` - Production mode

### Frontend (cd frontend)
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5010
- **Health Check**: http://localhost:5010/health

## 🔐 Environment Variables

### Backend (.env.development)
```env
NODE_ENV=development
PORT=5010
DB_CONNECTION_STRING=mongodb://...
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.development)
```env
REACT_APP_API_BASE_URL=http://localhost:5010
REACT_APP_ENV=development
```

## 📦 Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS, Morgan, Body-parser

### Frontend
- React 18
- Redux Toolkit + Redux Persist
- Material-UI (MUI)
- Axios
- React Router

## 🔒 Security Notes

- Never commit `.env` files
- Use strong JWT secrets in production
- Update CORS_ORIGIN for production
- Use environment-specific configurations

## 📝 Development Workflow

1. Create feature branch
2. Make changes
3. Test locally with `npm run dev`
4. Commit changes (ensure .env files are not committed)
5. Push and create PR

## 🚢 Deployment

### Backend
1. Set production environment variables
2. Build: `npm install --production`
3. Start: `NODE_ENV=production npm start`

### Frontend
1. Set production environment variables
2. Build: `npm run build`
3. Serve the `build/` directory

## 📞 Support

For issues or questions, please create an issue in the repository.
