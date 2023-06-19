import { USER } from "../models/user.js";
import {checkIsAllRequiredFieldsPresent} from '../helpers/validation.js';

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
  if(!isAllRequiredFieldsPresent) {
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
  if (password && password.length < 3) {
    throw new Error("Incorrect password. Password must be longer than 3 characters");
  }
}

const validationFullName = ({ lastName, firstName }) => {
  if (lastName && lastName.replace(/\s/g, '').length < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
  if (firstName && firstName.replace(/\s/g, '').length < 1) {
    throw new Error('Name cannot be empty or less than one letter');
  }
}

const validationPhone = ({ phoneNumber }) => {
  const reg = /^\+380\d{9}$/;
  if (phoneNumber && !reg.test(phoneNumber)) {
    throw new Error("Incorrect number. Number must have the format +380XXXXXXXXX");
  }
}

const validationGmail = ({ email }) => {
  const re = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
  if (email && !re.test(email)) {
    throw new Error("Incorrect email. Email must be from gmail");
  }
}

const updateUserValid = (req, res, next) => {
  isBodyHaveOneRequired(req);
  validateFields(req);
  next();
};

const isBodyHaveOneRequired = ( { body }) => {
  const {id, ...possibleUSER} = USER;
  if (!Object.keys(body).every(key => possibleUSER.hasOwnProperty(key))) {
    throw new Error('Incorrect body fields');
  }

  if(Object.keys(body).length === 0) {
    throw new Error('Body can`t be empty')
  }
}

export { createUserValid, updateUserValid };
