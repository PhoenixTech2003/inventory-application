const { Router } = require("express");
const controller = require("../controllers/indexControllers");


const indexRouter = Router();

indexRouter.get("/", controller.renderIndex);
indexRouter.get("/items/:category", controller.renderItems)

module.exports = indexRouter;
