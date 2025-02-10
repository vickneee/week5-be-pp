const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const morgan = require("morgan");
app.use(morgan("dev"));
require("dotenv").config();

connectDB();

// // Example route that throws an error
// app.get("/error", (req, res, next) => {
//   // Trigger an error
//   const error = new Error("Something went wrong!");
//   next(error);
// });

// Middleware to parse JSON
app.use(express.json());

// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);

// Use the unknownEndpoint middleware for handling undefined routes
app.use(unknownEndpoint);

// Use the errorHandler middleware for handling errors
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
