import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
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
  .get((req, res) => {
    console.log("bless you are a legend");
    res.json({ message: "success authentication " });
  })
  .post((req, res) => {});
router
  .route("/product/:id")
  .get(body("name").isString(), handleInputErrors, (req, res) => {})
  .put(body("name").isString(), handleInputErrors, (req, res) => {})
  .delete((req, res) => {});

/**
 * Updates route
 */
router
  .route("/update")
  .get(() => {})
  .post(
    body("title").exists(),
    body("body").exists().isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),

    body("version").optional(),
    () => {}
  );
router
  .route("/update/:id")
  .get((req, res) => {})
  // .post((req: Request, res: Response) => {})
  .put(
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),

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
