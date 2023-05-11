// backend/src/app/index.js
import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemsRoute.js";

const app = express();

// Configure CORS settings to allow requests only from localhost:3000
const corsOptions = {
    origin: "http://localhost:3000",
};

// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(express.json());

// Set up item routes
itemRoutes(app);

export default app;
