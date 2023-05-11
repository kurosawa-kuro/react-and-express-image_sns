// Path: backend/src/app/routes/itemsRoute.js

import asyncHandler from "express-async-handler";
import { getAllItemsController, createNewItemController } from "../controllers/itemController.js";

const itemRoutes = (app) => {
    // Get all items
    app.get("/items", asyncHandler(getAllItemsController));

    // Create a new item
    app.post("/items", asyncHandler(createNewItemController));
};

export default itemRoutes;
