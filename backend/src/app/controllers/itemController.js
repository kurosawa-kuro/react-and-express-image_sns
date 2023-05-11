// Path: backend/src/app/controllers/itemController.js

import asyncHandler from "express-async-handler";
import { getAllItems, createNewItem } from "../models/itemModel.js";

export const getAllItemsController = asyncHandler(async (req, res) => {
    const items = await getAllItems();
    res.json(items);
});

export const createNewItemController = asyncHandler(async (req, res) => {
    const newItem = await createNewItem(req.body);
    res.status(201).json(newItem);
});

