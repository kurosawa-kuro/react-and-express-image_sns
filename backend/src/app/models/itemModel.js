// Path: backend/src/app/models/itemModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const getAllItems = async () => {
    const items = await db.item.findMany();
    return items;
};

export const createNewItem = async (itemData) => {
    const newItem = await db.item.create({ data: itemData });
    return newItem;
};
