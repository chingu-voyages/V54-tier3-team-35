import express from "express";
import QueryController from "../controllers/queries-controllers";
import QueryMiddleware from "../middleware/queries-middleware";
import usersMiddleware from "../middleware/users-middleware";

const queriesRouter = express.Router();

queriesRouter.post(
  "/",
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.uploadQuery
);

//just a test route that only authenticated users can see..
queriesRouter.get("/protected", usersMiddleware.verifyToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

export default queriesRouter;
