import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// schema to verify the input send by the frontend for register
const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
});

// schema to verify the input send by the frontend for login
const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export function register(req: Request, res: Response, next: NextFunction) {
  const { email, password, firstName, lastName } = req.body;
  // validate the register schema then call the move to the next function
  registerSchema
    .validateAsync({ email, password, firstName, lastName })
    .then((response) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Invalid input parameters",
      });
    });
}

export function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  // validate the login schema then call the move to the next function
  loginSchema
    .validateAsync({
      email,
      password,
    })
    .then((response) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Invalid input parameters",
      });
    });
}
