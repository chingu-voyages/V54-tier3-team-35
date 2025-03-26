import express from "express";
import QueryController from "../controllers/queries-controllers";
import QueryMiddleware from "../middleware/queries-middleware";

const queriesRouter = express.Router();

queriesRouter.post(
  "/",
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.uploadQuery
);

export default queriesRouter;
