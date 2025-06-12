/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Quản lý sản phẩm
 */

const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller");

router.get("/product",
      /* #swagger.tags = ['Product'] */
       productController.getAllProducts);
router.post("/product",
      /* #swagger.tags = ['Product'] */
     productController.createProduct);
router.get("/product/:id", 
      /* #swagger.tags = ['Product'] */
    productController.getProductById);
router.get("/product/slug/:slug", 
      /* #swagger.tags = ['Product'] */
    productController.getProductBySlug);
router.put("/product/:id", 
      /* #swagger.tags = ['Product'] */
    productController.updateProduct);
router.delete("/product/:id", 
      /* #swagger.tags = ['Product'] */
    productController.deleteProduct);

module.exports = router;
