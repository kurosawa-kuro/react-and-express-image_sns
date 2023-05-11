// Path: backend/src/app/models/userModel.js

import bcyptjs from "bcryptjs";
import { db } from "../../database/prisma/prismaClient.js";

export const createUser = async ({ name, password, email, isAdmin }) => {
    const newUser = await db.user.create({
        data: { name, password: await bcyptjs.hash(password, 10), email, isAdmin },
    });

    return newUser;
};

export async function getUserByEmail(email) {
    const user = await db.user.findUnique({ where: { email } });
    return user;
};
