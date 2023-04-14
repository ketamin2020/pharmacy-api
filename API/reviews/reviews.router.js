const { Router } = require("express");
const authHiddleware = require("../middlewares/authorization");
const reviewsControllers = require("./reviews.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const reviewRouter = Router();

reviewRouter.get("/get", asyncWrapper(reviewsControllers.getReviews));
reviewRouter.get(
  "/reviews-list",
  asyncWrapper(reviewsControllers.getReviewsByPropertyId)
);
reviewRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(reviewsControllers.postReview)
);
reviewRouter.delete("/delete", asyncWrapper(reviewsControllers.deleteReview));

module.exports = reviewRouter;
