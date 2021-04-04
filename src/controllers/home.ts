import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

export const homeController = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to Article blog App",
  });
};
