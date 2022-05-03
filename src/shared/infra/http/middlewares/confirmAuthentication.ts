import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number; // criação
  exp: number; // expira
  sub: string; // id do usuario
}

export async function confirmAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  // Bearer 576890ipok2edf
  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, auth.secret_token);

    const { sub: userId } = decodedToken as ITokenPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
}
