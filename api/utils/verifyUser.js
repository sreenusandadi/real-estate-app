import jwt from "jsonwebtoken";
import handleError from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401, "UnauthoriZed"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) next(handleError(403, "Forbidden"));

    req.user = user;
    return next();
  });
};
