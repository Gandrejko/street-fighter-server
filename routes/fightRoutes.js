import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get('/', (req, res, next) => {
  res.data = fightsService.getAll();
  next();
}, responseMiddleware);

router.post('/', (req, res, next) => {
  res.data = fightsService.create(req.body);
  next();
}, responseMiddleware);

export { router };
