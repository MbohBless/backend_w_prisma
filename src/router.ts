import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/products";
import { handleInputErrors } from "./modules/middlewares";

const router = Router();

router.route("/").get((req, res) => {
  res.json({ message: "hello get method" });
  //   console.log("i am grateful for the experience");
});
/**
 * Product route
 */
router
  .route("/product")
  .get(getProducts)
  .post(body("name").isString(), handleInputErrors, createProduct);
router
  .route("/product/:id")
  .get(getOneProduct)
  .put(body("name").isString(), handleInputErrors, updateProduct)
  .delete(deleteProduct);

/**
 * Updates route
 */
router
  .route("/update")
  .get(() => {})
  .post(
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),

    () => {}
  );
router
  .route("/update/:id")
  .get((req, res) => {})
  // .post((req: Request, res: Response) => {})
  .put(
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    (req: Request, res: Response) => {}
  )
  .delete((req, res) => {});

router
  .route("/updatepoints")
  .get(() => {})
  .post(
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    (req: Request, res: Response) => {}
  );
router
  .route("/updatepoints/:id")
  .get(() => {})
  .put(
    body("name").optional().isString(),
    body("description").optional().isString(),
    (req: Request, res: Response) => {}
  )
  .delete(() => {});

export default router;
