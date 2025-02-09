import { body, ValidationChain } from 'express-validator';

const userValidationRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),

  body('surname')
    .trim()
    .notEmpty()
    .withMessage('Surname is required')
    .isLength({ min: 2 })
    .withMessage('Surname must be at least 2 characters long'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),

  body('favorite_color')
    .optional()
    .trim()
    .isString()
    .withMessage('Favorite color must be a string'),

  body('contact_preference')
    .notEmpty()
    .withMessage('Contact preference is required')
    .isArray()
    .withMessage('Contact preference must be an array')
    .custom((value: any) => {
      const validOptions = ['email', 'phone_call', 'sms'];
      if (!Array.isArray(value)) return false;
      return value.every((v: string) => validOptions.includes(v));
    })
    .withMessage(
      "Each contact preference must be either 'email', 'phone_call', or 'sms'"
    ),
];

export default userValidationRules;
