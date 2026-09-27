const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDb = require("./config/db");

dotenv.config();

// Database connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// Home route
app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to the food server</h1>");
});

// Port
const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`.bgCyan);
});