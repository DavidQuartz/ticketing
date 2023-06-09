import express, { Request, Response, NextFunction } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
  '/api/tickets',
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({});

    res.status(200).json({
      status: 'success',
      tickets,
    });
  }
);

export { router as ticketIndexingRouter };
