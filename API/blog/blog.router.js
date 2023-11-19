const { Router } = require("express");

const BlogControllers = require("./blog.controller.js");
const asyncWrapper = require("../../utils/asyncWrapper.js");
const authHiddleware = require("../middlewares/authorization.js");

const blogRouter = Router();

blogRouter.get(
  "/get",
  // asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BlogControllers.getBlogs)
);
blogRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BlogControllers.postBlog)
);
blogRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BlogControllers.putBlog)
);
blogRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BlogControllers.deleteBlog)
);

module.exports = blogRouter;
