import { Request, Response } from 'express';
import managerSchema from '../models/Manager';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingManager = await managerSchema.findOne({ email });
    if (existingManager) {
      res.status(400).json({ message: 'Manager already exists' });
      return; // ✅ explicit return to satisfy TS
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await managerSchema.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Manager registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const manager = await managerSchema.findOne({ email });
    if (!manager) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: manager._id }, process.env.JWT_KEY!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
