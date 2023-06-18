import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@nantoo/tickets';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
  '/api/tickets/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new NotFoundError());
    }
    res.status(200).json({
      status: 'success',
      ticket,
    });
  }
);

export { router as showTicketRouter };
