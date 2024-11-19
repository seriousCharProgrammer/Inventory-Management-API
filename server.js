const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectdb = require("./DB");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const PORT = process.env.PORT;
const errorHandler = require("./Middlewares/error");
const UserRouter = require("./Routes/UserRoutes");
const Inventoryrouter = require("./Routes/InventoryRoute");
const LogRouter = require("./Routes/LogRoute");
const authrouter = require("./Routes/authroute");
const app = express();
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(hpp());
app.use(helmet());
//Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/inventory", Inventoryrouter);
app.use("/api/v1/log", LogRouter);
app.use("/api/v1/auth", authrouter);
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`server listenig on port:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  server.close(() => {
    process.exit(1);
  });
});
