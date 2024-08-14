const { Router } = require("express");
const controller = require("../controllers/addItemController");
const addItemsRouter = Router();

addItemsRouter.get("/", controller.renderAddItems);
addItemsRouter.post("/", controller.insertProducts);
module.exports = addItemsRouter;
