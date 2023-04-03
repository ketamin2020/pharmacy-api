require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { errorConverter, errorHandler } = require("./middlewares/error");
const authRouter = require("./auth/auth.router");
const usersRouter = require("./users/users.router");
const uploadRouter = require("./upload/upload.router");
const brandsRouter = require("./brands/brands.router");
const partnerRouter = require("./partners/partner.router");
const productRouter = require("./products/products.router");
const workerRouter = require("./workers/worker.router");
const makerRouter = require("./makers/makers.router");
const substanceRouter = require("./substances/substances.router");
const groupRouter = require("./groups/groups.router");
const instructionRouter = require("./instructions/instructions.router");
const propertyRouter = require("./properties/properties.router");
const tradeNameRouter = require("./tradeName/tradeName.router");
const imagesRouter = require("./images/images.router");
const mainRouter = require("./main/main.router");
const bannerRouter = require("./banner/banner.router");
const formRouter = require("./form/form.router");
const administrationRouteRouter = require("./administrationRoute/administration_route.router");
const quantityRouter = require("./quantity/quantity.router");
const temperaturesRouter = require("./temperature/temperature.router");
const packagesRouter = require("./package/package.router");
const dosageRouter = require("./dosage/dosage.router");
const priceRouter = require("./price/price.router");
const publicRouter = require("./public/public.router");
const ApiError = require("../utils/ApiError");
const helmet = require("helmet");
const {
  ConflictError,
  UnauthorizedError,
  JoiValidationError,
  NotFoundError,
} = require("../helpers/error.helpers");

module.exports = class taskMgrServer {
  constructor() {
    this.server = null;
    this.SERVER_PORT = null;
  }

  async start() {
    // Input start middlwares here
    this.initPort();
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    await this.initDatabase();
    this.errorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
    console.log("server initialized");
  }

  initPort() {
    this.SERVER_PORT = process.env.PORT || 3000;
    console.log("port initialized");
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(
      // cors({ origin: `${process.env.BASE_URL}/` })
      cors({})
    );
    this.server.use(helmet());
    this.server.use(errorConverter);
    this.server.use(errorHandler);
    this.server.use(morgan("dev"));

    console.log("middlewares initialized");
  }

  errorHandling() {
    let status = 500;
    this.server.use((error, req, res, next) => {
      if (
        error instanceof ConflictError ||
        error instanceof UnauthorizedError ||
        error instanceof JoiValidationError ||
        error instanceof NotFoundError
      ) {
        status = error.status;
      }
      return res.status(status).send({ message: error.message });
    });
  }

  initRoutes() {
    // input routers here
    this.server.use("/api/auth", authRouter);
    this.server.use("/api/users", usersRouter);
    this.server.use("/api/upload", uploadRouter);
    this.server.use("/api/brands", brandsRouter);
    this.server.use("/api/partners", partnerRouter);
    this.server.use("/api/products", productRouter);
    this.server.use("/api/workers", workerRouter);
    this.server.use("/api/makers", makerRouter);
    this.server.use("/api/substances", substanceRouter);
    this.server.use("/api/groups", groupRouter);
    this.server.use("/api/instructions", instructionRouter);
    this.server.use("/api/properties", propertyRouter);
    this.server.use("/api/trade-name", tradeNameRouter);
    this.server.use("/api/images", imagesRouter);
    this.server.use("/api/main", mainRouter);
    this.server.use("/api/banner", bannerRouter);
    this.server.use("/api/form", formRouter);
    this.server.use("/api/route", administrationRouteRouter);
    this.server.use("/api/quantity", quantityRouter);
    this.server.use("/api/temperature", temperaturesRouter);
    this.server.use("/api/package", packagesRouter);
    this.server.use("/api/dosage", dosageRouter);
    this.server.use("/api/price", priceRouter);
    this.server.use("/api/drugs", publicRouter);

    console.log("Routes initialized");
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log("DB initialized");
  }

  startListening() {
    this.server.listen(this.SERVER_PORT, () => {
      console.log("Server started at PORT:", this.SERVER_PORT);
    });
  }
};
