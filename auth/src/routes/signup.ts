import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

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
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return next(new BadRequestError('Email already in use'));
      }

      const user = User.build({ email, password });
      await user.save();

      // Generate JWT
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY! // this exclamation mark tells typescript that we are sure this variable is not undefined
      );

      // Store it on the session object
      req.session = { jwt: userJwt };

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
