// backend/src/app/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/usersRoute.js";
import itemRoutes from "./routes/itemsRoute.js";
import postRoutes from "./routes/postsRoute.js";

const app = express();

// Configure CORS settings to allow requests only from localhost:3000
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
};

// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

// Set up item routes
userRoutes(app);
postRoutes(app);
itemRoutes(app);

export default app;
