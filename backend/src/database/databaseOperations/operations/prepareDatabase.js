import { db } from "../../prisma/prismaClient.js";

async function establishDatabaseConnection() {
    try {
        await db.$connect();
        console.log("Connected to the database.");
    } catch (e) {
        console.error("Failed to connect to the database:", e);
        throw e;
    }
}

async function clearPostTagTable() {
    try {
        await db.postTag.deleteMany({});
        console.log("Cleared post tag table.");
    } catch (e) {
        console.error("Failed to clear post tag table:", e);
        throw e;
    }
}

async function clearPostTable() {
    try {
        await db.post.deleteMany({});
        console.log("Cleared post table.");
    } catch (e) {
        console.error("Failed to clear post table:", e);
        throw e;
    }
}

async function clearUserTable() {
    try {
        await db.user.deleteMany({});
        console.log("Cleared user table.");
    } catch (e) {
        console.error("Failed to clear user table:", e);
        throw e;
    }
}

async function clearCommentTable() {
    try {
        await db.comment.deleteMany({});
        console.log("Cleared comment table.");
    } catch (e) {
        console.error("Failed to clear comment table:", e);
        throw e;
    }
}

async function clearTagTable() {
    try {
        await db.tag.deleteMany({});
        console.log("Cleared tag table.");
    } catch (e) {
        console.error("Failed to clear tag table:", e);
        throw e;
    }
}

async function clearUserFollowerTable() {
    try {
        await db.UserFollower.deleteMany({});
        console.log("Cleared UserFollower table.");
    } catch (e) {
        console.error("Failed to clear UserFollower table:", e);
        throw e;
    }
}

export async function setupDatabaseForOperations() {
    await establishDatabaseConnection();

    await clearPostTagTable();
    await clearTagTable();
    await clearCommentTable();
    await clearPostTable();
    await clearUserFollowerTable();
    await clearUserTable();
}
