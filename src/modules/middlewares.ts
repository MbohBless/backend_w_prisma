import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req:Request, res:Response,next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }
  else{
    next()
  }
};
