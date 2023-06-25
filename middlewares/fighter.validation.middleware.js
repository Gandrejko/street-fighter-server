import { FIGHTER } from "../models/fighter.js";
import {checkIsAllRequiredFieldsPresent, checkIsNotHaveExtraKey} from '../helpers/validation.js';

const createFighterValid = (req, res, next) => {
  try {
    isBodyHaveAllRequired(req);
    validateFields(req);

    next();
  } catch ({message}) {
    next({message, status: 400})
  }
}

const isBodyHaveAllRequired = ({ body }) => {
  const { id, health, ...fighter } = FIGHTER;
  const requiredFighterKeys = Object.keys(fighter);
  const isAllRequiredFieldsPresent = checkIsAllRequiredFieldsPresent(requiredFighterKeys, Object.keys(body));
  const isNotHaveExtraKey = checkIsNotHaveExtraKey(requiredFighterKeys, Object.keys(body));
  if(!isAllRequiredFieldsPresent || !isNotHaveExtraKey) {
    throw new Error("Incorrect body fields");
  }
}

const validateFields = ({ body }) => {
  validationName(body);

  const { health, power, defense } = body;

  const configFighterParams = [
    {value: health, min: 80, max: 120, paramName: 'Health'},
    {value: power, min: 1, max: 100, paramName: 'Power'},
    {value: defense, min: 1, max: 10, paramName: 'Defense'}
  ];
  validationFighterParams(configFighterParams);
}

const validationName = ({ name }) => {
  if (name && name.replace(/\s/g, '').length < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
  if (name && /\s/g.test(name)) {
    throw new Error('Name should not include spaces');
  }
}

const validationFighterParams = (arr) => {
  arr.forEach(({ value, min, max, paramName }) => {
    if ((value !== undefined || value === 0) && (value < min || value > max || isNaN(value) || typeof value !== 'number')) {
      throw new Error(`${paramName} must be number between ${min} and ${max}`);
    }});
}

const updateFighterValid = (req, res, next) => {
  try {
    isBodyHaveOneRequired(req);
    validateFields(req);
    next();
  } catch ({message}) {
    next({message, status: 400})
  }
}

const isBodyHaveOneRequired = ( { body }) => {
  const {id, ...possible} = FIGHTER;

  if (!Object.keys(body).every(key => possible.hasOwnProperty(key))) {
    throw new Error('Incorrect body fields');
  }

  if(Object.keys(body).length === 0) {
    throw new Error('Body can`t be empty')
  }
}

export { createFighterValid, updateFighterValid };
