// Path: backend/src/app/middlewares/authMiddleware.js

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['jwt'];

    if (!token) {
        return
    }

    // const token = req.headers.authorization.slice(7);
    if (!token) {
        return res.status(401).json({ error: "unauthenticated" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach user payload to the request object
        next();
    } catch (e) {
        return res.status(401).json({ error: "unauthenticated" });
    }
};
