import { Request, Response, NextFunction } from "express";

/**
 * for "/" path we just return a JSON object containing a message
 */
export const homeController = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to Article blog App",
  });
};
