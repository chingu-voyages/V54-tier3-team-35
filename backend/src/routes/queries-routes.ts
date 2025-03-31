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

export default queriesRouter;
