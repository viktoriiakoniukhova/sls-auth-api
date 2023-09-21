const jwt = require("jsonwebtoken");

exports.generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRES * 60}s`,
  });
};

exports.generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {});
};

exports.verifyAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET,
      (err, tokenDetails) => {
        if (err) return reject(false);
        resolve(true);
      }
    );
  });
};
