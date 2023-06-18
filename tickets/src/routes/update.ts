import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
  requireAuth,
} from '@nantoo/tickets';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Please provide a valid title'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price should be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return next(new NotFoundError());

    // if a different user is trying to update a ticket
    if (req.currentUser!.id !== ticket.userId)
      return next(new NotAuthorizedError());

    // update and save the ticket
    ticket.set({ title: req.body.title, price: req.body.price });

    await ticket.save();

    res.status(200).json({
      status: 'success',
      ticket,
    });
  }
);

export { router as updateTicketRouter };
