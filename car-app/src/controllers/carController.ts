import { Request, Response } from 'express';
import carSchema from '../models/Car';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await carSchema.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCars = async (req: Request, res: Response) => {
  const { brand, model, minPrice, maxPrice, availability, page = 1, limit = 10 } = req.query;

  const query: any = {};

  if (brand) query.brand = brand;
  if (model) query.model = model;
  if (availability) query.availability = availability === 'true';
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  try {
    const cars = await carSchema.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
