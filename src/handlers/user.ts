import prisma from "../db";
import { comparePasswords, createJWT, hasPassword } from "../modules/auth";

export const createNewUser = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hasPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signIn = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePasswords(req.body.password, user.password);
  console.log(isValid);
  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }
  const token = createJWT(user);
  res.json({ token });
};
