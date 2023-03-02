import { Request, Response } from "express";
import prisma from "../db";

// get all user products
export const getProducts = async (req, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });

  res.json({ data: user.Product });
};

// getone
export const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongToId: { id: req.params.id, belongToId: req.user.id },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongToId: { id: req.params.id, belongToId: req.user.id },
    },
  });
  res.json({ data: deleted });
};
