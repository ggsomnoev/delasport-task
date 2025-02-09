import { Request, Response } from 'express';
import userService from '../services/userService';
import logger from '../utils/logger';

const userController = {
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ new_user: user });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        logger.warn(
          `Unique constraint error: ${error.errors[0]?.message}`,
          req.body
        );
        res.status(409).json({
          error: 'Unique constraint violation',
          message: error.errors[0]?.message,
          field: error.errors[0]?.path,
          value: error.errors[0]?.value,
        });
      } else {
        logger.error(`Error creating user: ${error.message}`, {
          stack: error.stack,
        });
        res.status(500).json({
          error: 'Failed to create user',
          details: error.message,
        });
      }
    }
  },

  getAllUsers: async (_: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      logger.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res
          .status(404)
          .json({ error: 'User not found', user_id: req.params.id });
      } else {
        res.json({ updated_user: updatedUser });
      }
    } catch (error) {
      logger.error(`Error updating user ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await userService.deleteUser(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      logger.error(`Error deleting user ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};

export default userController;
