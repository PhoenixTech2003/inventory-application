const { Router } = require("express");
const controller = require("../controllers/indexControllers");


const indexRouter = Router();

indexRouter.get("/", controller.renderIndex);
indexRouter.post("/", controller.deleteCategory)
indexRouter.get("/items/:category", controller.renderItems)
indexRouter.post("/items/:category", controller.deleteItem)
module.exports = indexRouter;
