import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters long'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      // if validation errors exist
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return next(new BadRequestError('Email already in use'));
      }

      const user = User.build({ email, password });
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      console.log('Something went wrong', error);
      res.status(500).json({
        error,
      });
    }
  }
);

export { router as signupRouter };
