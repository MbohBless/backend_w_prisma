import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.json({ message: "hello get method"});
//   console.log("i am grateful for the experience");
});
/**
 * Product route
 */
router
  .route("/product")
  .get(() => {
    console.log("bless you are a legend");
  })
  .post(() => {});
router
  .route("/product/:id")
  .get(() => {})
  .put(() => {})
  .delete(() => {});

/**
 * Updates route
 */
router
  .route("/update")
  .get(() => {})
  .post(() => {});
router
  .route("/update/:id")
  .get(() => {})
  .put(() => {})
  .delete(() => {});

router
  .route("/updatepoints")
  .get(() => {})
  .post(() => {});
router
  .route("/updatepoints/:id")
  .get(() => {})
  .put(() => {})
  .delete(() => {});

export default router;
