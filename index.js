const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT;
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use("/auth", authRoute);
app.use("/", userRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// console.log(require("crypto").randomBytes(64).toString("hex"));
