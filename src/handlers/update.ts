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
  const {productId, ...rest} = req.body
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    return res.json({ message: "nope" });
  }
  const update = await prisma.update.create({
    data: rest,
  });

  res.json({ data: update });
};
export const updateUpdate = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.status(400);
    return res.json({ data: "nope" });
  }
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.status(400);
    return res.json({ data: "nope" });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ message: deleted });
};
