// Path: backend/src/app/middlewares/authMiddleware.js

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    console.log("req.headers.authorization", req.headers.authorization);
    // 下記の文字列の頭文字７文字分を削除する
    const token = req.headers.authorization.slice(7);

    // const token = req.cookies["token"];
    console.log({ token });

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
