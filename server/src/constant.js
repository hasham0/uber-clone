const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const DB_NAME = "uberCloneProject";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prodcution",
    maxAge: 3600000,
};
export { ACCESS_TOKEN, REFRESH_TOKEN, DB_NAME, cookieOptions };
