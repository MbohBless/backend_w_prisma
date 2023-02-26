import { Request, Response } from "express";
import prisma from "../db";

export const getOneUpdate = async (req: any, res: any) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};
export const getUpdates = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsTo: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  res.json({ data: updates });
};
export const createUpdate = async (req: any, res: any) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.json({ message: "nope" });
  }
  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};
export const updateUpdate = async (req: any, res: any) => {
  const product = await prisma.product.findFirst({
    where: {
      belongToId: req.user.id,
      // Update:{}
    },
  });
  
};
export const deleteUpdate = async (req: any, res: any) => {};
