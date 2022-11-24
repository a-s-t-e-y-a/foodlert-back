const express = require("express");
const router = express.Router();

const inventorySupplierController = require("../controllers/inventorySupplier.controller");
const inventorySupplierCartController = require("../controllers/inventorySupplierCart.controller");
const iventoryOrderController = require("../controllers/inventoryOrder.controller");
const inventoryStocktakeController = require("../controllers/inventoryStocktake.controller");

const auth = require("./../middlewares/auth");

router.use(auth);

// supplier
router.post("/supplier", inventorySupplierController.createInventorySupplier);
router.get("/supplier", inventorySupplierController.getAllInventorySupplier);
router.get("/supplier/:id", inventorySupplierController.getInventorySupplier);
router.patch(
  "/supplier/:id",
  inventorySupplierController.updateInventorySupplier
);
router.delete(
  "/supplier/:id",
  inventorySupplierController.deleteInventorySupplier
);

// cart
router.post(
  "/cart/:id",
  inventorySupplierCartController.createInventorySupplierCart
);
router.get(
  "/cart/:id",
  inventorySupplierCartController.getAllInventorySupplierCart
);
router.patch(
  "/:id/cart/:cartId",
  inventorySupplierCartController.updateInventorySupplierCart
);
router.delete(
  "/:id/cart/:cartId",
  inventorySupplierCartController.deleteInventorySupplierCart
);

// order
router.post("/order/", iventoryOrderController.createInventoryOrder);
router.get("/order/", iventoryOrderController.getAllInventoryOrder);
router.get("/order/:id", iventoryOrderController.getInventoryOrder);
router.patch("/order/:id", iventoryOrderController.updateInventoryOrder);
router.delete("/order/:id", iventoryOrderController.deleteInventoryOrder);

// stockTake
router.post(
  "/stocktake",
  inventoryStocktakeController.createInventoryStocktake
);
router.get("/stocktake", inventoryStocktakeController.getAllInventoryStocktake);
router.get(
  "/stocktake/:id",
  inventoryStocktakeController.getInventoryStocktake
);
router.patch(
  "/stocktake/:id",
  inventoryStocktakeController.updateInventoryStocktake
);
router.delete(
  "/stocktake/:id",
  inventoryStocktakeController.deleteInventoryStocktake
);
router.post(
  "/add/stocktake/:supplierId/:cartId",
  inventoryStocktakeController.addItemToStocktake
);

module.exports = router;
