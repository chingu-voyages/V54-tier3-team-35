import express from "express";
import QueryController from "../controllers/queries-controllers";
import QueryMiddleware from "../middleware/queries-middleware";
import usersMiddleware from "../middleware/users-middleware";

const queriesRouter = express.Router();

queriesRouter.post(
  "/",
  usersMiddleware.verifyToken,
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.uploadQuery
);

queriesRouter.get("/", usersMiddleware.verifyToken, QueryController.getQueries);

queriesRouter.get(
  "/:id",
  usersMiddleware.verifyToken,
  QueryController.getSpecificQuery
);

queriesRouter.patch(
  "/:id",
  usersMiddleware.verifyToken,
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.editQuery
);

queriesRouter.delete(
  "/:id",
  usersMiddleware.verifyToken,
  QueryController.deleteQuery
);

//just a test route that only authenticated users can see..
queriesRouter.get("/protected", usersMiddleware.verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

export default queriesRouter;
