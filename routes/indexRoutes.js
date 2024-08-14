const { Router } = require("express");
const controller = require("../controllers/indexControllers");

const indexRouter = Router();

indexRouter.get("/", controller.renderIndex);
indexRouter.post("/", controller.deleteCategory);
indexRouter.get("/items/:category", controller.renderItems);
indexRouter.post("/items/:category", controller.deleteItem);
indexRouter.get("/update-category", controller.renderUpdateCategory);
indexRouter.post("/update-category", controller.updateCategory);
indexRouter.get("/update-item", controller.renderUpdateItem);
indexRouter.post("/update-item", controller.updateItem);
module.exports = indexRouter;
