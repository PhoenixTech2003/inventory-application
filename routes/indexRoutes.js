const { Router } = require("express");
const controller = require("../controllers/indexControllers");

const indexRouter = Router();

indexRouter.get("/", controller.renderIndex);

module.exports = indexRouter;
