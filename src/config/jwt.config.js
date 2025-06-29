import crypto from "crypto";

// Generate a random secret key
export const secretKey = crypto.randomBytes(32).toString("hex");

