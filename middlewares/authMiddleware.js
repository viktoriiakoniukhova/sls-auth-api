const { verifyAccessToken, generateAccessToken } = require("../config/jwt");
const { tryCatch } = require("../utils/tryCatch");

const authMiddleware = tryCatch(async (req, res, next) => {
  if (!req?.headers?.authorization?.startsWith("Bearer"))
    throw new Error("No token attached to the header.");

  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new Error("Not Authorized, please login again.");
  req.token = token;
  const isVerified = await verifyAccessToken(token);

  if (!isVerified) {
    const { email } = req.body;
    const accessToken = generateAccessToken(email);
    const newUser = await db.query(
      `UPDATE "user" SET accessToken = $1 WHERE email = $2`,
      [accessToken, email]
    );
  }

  next();
});

module.exports = { authMiddleware };
