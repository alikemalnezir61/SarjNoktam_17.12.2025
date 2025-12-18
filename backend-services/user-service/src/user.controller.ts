import { Request, Response } from 'express';
import { registerUser, loginUser } from './user.service';
import { publishUserRegistered } from './rabbitmq';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    await publishUserRegistered(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
