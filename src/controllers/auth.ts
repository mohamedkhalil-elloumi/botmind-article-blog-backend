import { Request, Response } from "express";
import { AuthService } from "../services/Auth";
import jwt from "jsonwebtoken";
import config from "../config/index";

const authService = new AuthService();

/**
 *
 * @param req
 * @param res
 */

// register controller
export async function register(req: Request, res: Response) {
  // get elements from the request body
  const { email, password, firstName, lastName } = req.body;
  try {
    // call the register funtion declared in the auth service
    const payload = await authService.register(
      email,
      password,
      firstName,
      lastName
    );
    // based on the return statement we make different calls
    return res.status(201).json({
      message: "User created",
      data: payload,
    });
  } catch (err) {
    console.log(err);
    if (String(err).includes("Email Taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    }
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}

// Login controller
export async function login(req: Request, res: Response) {
  //retrieve attributes from body
  const { email, password } = req.body;
  try {
    const payload = await authService.login(email, password);
    //generetae token using the payload and the SECRET initiated in the env variables
    let token = jwt.sign(payload, config.SECRET, {});
    let auth = "Bearer " + token;
    // set the header field Authorization with Bearer + token
    res.setHeader("Authorization", auth);
    //return to the frontend the token without Bearer
    return res.status(200).send({ auth: true, token: token });
  } catch (error) {
    // handle different errors
    if (String(error).includes("Invalid email or password")) {
      return res.status(500).json({
        error: true,
        message: "Invalid email or password",
      });
    } else if (String(error).includes("User does not exist")) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    } else {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "An internal server error has occurred",
      });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  // retrieve user_id from url parameters
  const user_id = Number(req.params.id);
  try {
    //delete the user account along with his articles
    const payload = await authService.deleteUser(user_id);
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}
