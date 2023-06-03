import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../utilities/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return next(new BadRequestError('Invalid credentials!'));
      }

      const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );

      if (!passwordsMatch) {
        return next(new BadRequestError('Invalid credentials!'));
      }

      // Generate JWT
      const userJwt = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY! // this exclamation mark tells typescript that we are sure this variable is not undefined
      );

      // Store it on the session object
      req.session = { jwt: userJwt };

      res.status(201).json(existingUser);
    } catch (error) {
      console.log('Something went wrong', error);
      res.status(500).json({
        error,
      });
    }
  }
);

export { router as signinRouter };
