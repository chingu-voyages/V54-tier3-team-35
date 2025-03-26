import express from "express";
import QueryController from "../controllers/queries-controllers";


const queriesRouter = express.Router();

queriesRouter.post("/", QueryController.uploadQuery)


export default queriesRouter
