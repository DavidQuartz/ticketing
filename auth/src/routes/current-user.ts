import express, { Request, Response, NextFunction } from 'express';

import { currentUser } from '@nantoo/tickets';

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
