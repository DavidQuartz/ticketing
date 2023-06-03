import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentuserRouter };
