import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

/* verify the token sent by the frontend in order to validate most
of the http requests*/
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get token from the header and remove the bearer from start
  let auth = req.headers["authorization"];
  let token = auth.split(" ")[1];

  if (token == null)
    return res.status(401).json({ auth: false, message: "No token provided." });

  // check token using the Secret word for security measures
  jwt.verify(token, config.SECRET, (err: any, decoded: any) => {
    if (err)
      return res.status(403).json({ auth: false, message: "Forbidden." });
    next();
  });
};
