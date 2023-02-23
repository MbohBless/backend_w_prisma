import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
};
export const hasPassword = (password: string | Buffer) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not valid token " });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: "The token cannot be identified " });
    return;
  }
};
