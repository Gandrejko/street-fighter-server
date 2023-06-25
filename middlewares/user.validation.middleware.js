import { USER } from "../models/user.js";
import {checkIsAllRequiredFieldsPresent, checkIsNotHaveExtraKey} from '../helpers/validation.js';

const createUserValid = (req, res, next) => {
  try {
    isBodyHaveAllRequired(req);
    validateFields(req);
    next();
  } catch ({message}) {
    next({message, status: 400})
  }
};

const isBodyHaveAllRequired = ({ body }) => {
	const { id, ...user } = USER;
	const requiredUserKeys = Object.keys(user);
	const isAllRequiredFieldsPresent = checkIsAllRequiredFieldsPresent(requiredUserKeys, Object.keys(body));
  const isNotHaveExtraKey = checkIsNotHaveExtraKey(requiredUserKeys, Object.keys(body));
  if(!isAllRequiredFieldsPresent || !isNotHaveExtraKey) {
    throw new Error("Incorrect body fields");
  }
}

const validateFields = ({ body }) => {
  validationPassword(body);
  validationFullName(body);
  validationPhone(body);
  validationGmail(body);
}

const validationPassword = ({ password }) => {
  if (password !== undefined && password.length < 3) {
    throw new Error("Incorrect password. Password must be longer than 3 characters");
  }
}

const validationFullName = ({ lastName, firstName }) => {
  if (lastName !== undefined && lastName.replace(/\s/g, '').length < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
  if (firstName !== undefined && firstName.replace(/\s/g, '').length < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
}

const validationPhone = ({ phoneNumber }) => {
  const reg = /^\+380\d{9}$/;
  if (phoneNumber !== undefined && !reg.test(phoneNumber)) {
    throw new Error("Incorrect number. Number must have the format +380XXXXXXXXX");
  }
}

const validationGmail = ({ email }) => {
  const re = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
  if (email !== undefined && !re.test(email)) {
    throw new Error("Incorrect email. Email must be from gmail");
  }
}

const updateUserValid = (req, res, next) => {
  try {
    isBodyHaveOneRequired(req);
    validateFields(req);
    next();
  } catch ({message}) {
    next({message, status: 400})
  }
};

const isBodyHaveOneRequired = ( { body }) => {
  const {id, ...possibleUSER} = USER;
  const possibleUserKeys = Object.keys(possibleUSER);
  const isNotHaveExtraKey = checkIsNotHaveExtraKey(possibleUserKeys, Object.keys(body));
  if (!Object.keys(body).every(key => possibleUSER.hasOwnProperty(key)) || !isNotHaveExtraKey) {
    throw new Error('Incorrect body fields');
  }

  if(Object.keys(body).length === 0) {
    throw new Error('Body can`t be empty')
  }
}

export { createUserValid, updateUserValid };
