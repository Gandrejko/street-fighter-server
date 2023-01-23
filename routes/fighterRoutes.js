import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { errorHandler } from "../middlewares/error.handler.middleware.js";

const router = Router();

router.post('/', createFighterValid, (req, res, next) => {
  try {
    const {body, body: {name}} = req;

    if(fighterService.search({name})) {
      throw new Error(`User with name ${name} already exist`)
    }

    res.data = fighterService.create(body);
    next();
  } catch ({ message }) {
    next({message, status: 400})
  }
}, responseMiddleware, errorHandler);

router.get('/:id', (req, res, next) => {
  try {
    const { params: {id} }  = req;
    const fighter = fighterService.search({id});

    if(!fighter) {
      throw new Error('Fighter not found');
    }

    res.data = fighter;
    next();
  } catch ({ message }) {
    next({message, status: 404})
  }
}, responseMiddleware, errorHandler);

router.get('/', (req, res, next) => {
  res.data = fighterService.getAll();
  next()
}, responseMiddleware, errorHandler);

router.delete('/:id', (req, res, next) => {
  const { params: { id }}  = req;
  res.data = fighterService.delete(id);
  next();
}, responseMiddleware, errorHandler);

router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    const { body, params: { id }} = req;

    if (!fighterService.search({id})) {
      throw new Error('Fighter not found');
    }

    res.data = fighterService.update(id, body);
    next();
  } catch ({ message }) {
    next({message, status: 400});
  }
}, responseMiddleware, errorHandler);

export { router };
