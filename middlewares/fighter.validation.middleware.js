import { FIGHTER } from "../models/fighter.js";

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
  const { id, health: fighterHealth, ...required } = body;
  const {idFIGHTER, health: bodyHealth, ...requiredFIGHTER } = FIGHTER;

  const requiredKeys = JSON.stringify(Object.keys(required).sort());
  const requiredFIGHTERKeys = JSON.stringify(Object.keys(requiredFIGHTER).sort());
  console.log(requiredKeys, requiredFIGHTERKeys)
  if(requiredKeys != requiredFIGHTERKeys) {
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
  if (name && name.replace(/\s/g, '').lenght < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
}

const validationFighterParams = (arr) => {
  arr.forEach(({ value, min, max, paramName }) => {
    if ((value || value == 0) && (value < min || value > max || isNaN(value))) {
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
  const {id, ...possible} = body;

  if (!Object.keys(body).every(key => possible.hasOwnProperty(key))) {
    throw new Error('Incorrect body fields');
  }

  if(Object.keys(body).length == 0) {
    throw new Error('Body can`t be empty')
  }
}

export { createFighterValid, updateFighterValid };
