import { Request, Response, NextFunction } from "express";

function logger(request: Request, response: Response, next: NextFunction) {
  console.log(
    `${request.method} ${request.url} - ${new Date().toLocaleString()}`,
  );
  next();
}

export default logger;
