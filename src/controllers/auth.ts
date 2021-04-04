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
export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;
  try {
    const payload = await authService.register(
      email,
      password,
      firstName,
      lastName
    );

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

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const payload = await authService.login(email, password);
    let token = jwt.sign(payload, config.SECRET, {});
    let auth = "Bearer " + token;
    res.setHeader("Authorization", auth);
    return res.status(200).send({ auth: true, token: token });
  } catch (error) {
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
  const user_id = Number(req.params.id);
  try {
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
