import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@nantoo/tickets';
import { requireAuth } from '@nantoo/tickets';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Please provide a valid title'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price muse be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.status(201).json({
      status: 'success',
      ticket,
    });
  }
);

export { router as createTicketRouter };
