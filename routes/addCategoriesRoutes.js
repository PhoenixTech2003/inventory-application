const { Router } = require("express");
const controller = require("../controllers/addCategoryController");

const addCategoryRouter = Router();

addCategoryRouter.get("/", controller.renderAddCategories);
addCategoryRouter.post("/", controller.addCategories);

module.exports = addCategoryRouter;
