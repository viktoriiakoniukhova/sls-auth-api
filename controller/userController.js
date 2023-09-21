const { tryCatch } = require("../utils/tryCatch");
const db = require("../config/db");

const getCurrentUser = tryCatch(async (req, res) => {
  console.log(req.token);
  const user = await db.query(`SELECT * from "user" where accessToken = $1`, [
    req.token,
  ]);
  if (!user.rowCount) throw new Error("There is no user with such token.");

  const { id, email } = user.rows[0];
  res.status(200).json({
    success: true,
    data: { id, email },
  });
});

module.exports = { getCurrentUser };
