import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js'
import movieRoutes from './routes/movieRoute.js'
import tvRoutes from './routes/tvRoutes.js'
import searchRoutes from './routes/searchRoute.js'
import connectDB from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

// Init App
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Dotenv
dotenv.config();

// Database
connectDB();

const __dirname = path.resolve();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`))