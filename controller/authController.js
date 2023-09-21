const { hashPassword, isPasswordMatched } = require("../config/bcrypt");
const { tryCatch } = require("../utils/tryCatch");
const db = require("../config/db");
const { generateAccessToken, generateRefreshToken } = require("../config/jwt");

const signUp = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query(`SELECT * from "user" where email = $1`, [email]);
  if (user.rowCount)
    throw new Error("User with such email is already registered.");

  const hash = await hashPassword(password);
  const aToken = generateAccessToken(user.email);
  const rToken = generateRefreshToken(user.email);

  const newUser = await db.query(
    `INSERT INTO "user" (email, password, accessToken, refreshToken) values ($1, $2, $3, $4) RETURNING id, accessToken, refreshToken`,
    [email, hash, aToken, rToken]
  );

  if (!newUser) throw new Error("User registration failed.");

  res.status(200).json({
    success: true,
    data: newUser.rows[0],
  });
});

const signIn = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query(`SELECT * from "user" where email = $1`, [email]);
  if (!user.rowCount) throw new Error("There is no user with such email.");

  const isPwdMatched = await isPasswordMatched(password, user.rows[0].password);
  if (!isPwdMatched) throw new Error("Invalid password.");

  res.json({
    success: true,
    data: user.rows[0],
  });
});

module.exports = { signUp, signIn };
