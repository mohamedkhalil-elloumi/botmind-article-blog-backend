import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let auth = req.headers["authorization"];
  let token = auth.split(" ")[1];

  if (token == null)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, config.SECRET, (err: any, decoded: any) => {
    if (err)
      return res.status(403).json({ auth: false, message: "Forbidden." });
    next();
  });
};
