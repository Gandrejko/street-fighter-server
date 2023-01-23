import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { errorHandler } from "../middlewares/error.handler.middleware.js";

const router = Router();

router.post('/', createUserValid, (req, res, next) => {
  try {
    const {body: {email, phoneNumber}, id, ...body} = req;

    if(userService.search({email})) {
      throw new Error(`User with email ${email} already exist`)
    }

    if(userService.search({phoneNumber})) {
      throw new Error(`User with phone number ${phoneNumber} already exist`)
    }

    res.data = userService.create(body);
    next();
  } catch ({ message }) {
    next({message, status: 400})
  }
}, responseMiddleware, errorHandler);

router.get('/:id', (req, res, next) => {
  try {
    const { params: {id} }  = req;
    const user = userService.search({id});

    if(!user) {
      throw new Error('Fighter not found');
    }

    res.data = user;
    next();
  } catch ({ message }) {
    next({message, status: 404})
  }
}, responseMiddleware, errorHandler);

router.get('/', (req, res, next) => {
  res.data = userService.getAll();
  next()
}, responseMiddleware, errorHandler);

router.delete('/:id', (req, res, next) => {
  const { params: { id }}  = req;
  res.data = userService.delete(id);
  next();
}, responseMiddleware, errorHandler);

router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    const { body, params: { id, email, phoneNumber }} = req;

    if (!userService.search({id})) {
      throw new Error('User not found');
    }

    if(userService.search({email})) {
      throw new Error(`User with email ${email} already exist`)
    }

    if(userService.search({phoneNumber})) {
      throw new Error(`User with phone number ${phoneNumber} already exist`)
    }

    res.data = userService.update(id, body);
    next();
  } catch ({ message }) {
    next({message, status: 400});
  }
}, responseMiddleware, errorHandler);

export { router };
