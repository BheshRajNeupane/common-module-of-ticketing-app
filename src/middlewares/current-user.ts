import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    //!req.session?.jwt
    console.log("coomon req session test");

    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      "asdf"
      //  process.env.JWT_KEY!
    ) as UserPayload;
    console.log("pay", payload);

    req.currentUser = payload;
    console.log("currnet", req.currentUser);
  } catch (err) {}

  next();
};
