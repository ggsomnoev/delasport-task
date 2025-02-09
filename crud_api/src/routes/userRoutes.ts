import express from 'express';
import userController from '../controllers/userController';
import snakeCaseRequest from '../middleware/snakeCaseRequest';
import userValidationRules from '../middleware/userValidationRules';
import handleValidationErrors from '../middleware/handleValidationErrors';

const router = express.Router();
router.get('/', userController.getAllUsers);
router.post(
  '/',
  snakeCaseRequest,
  userValidationRules,
  handleValidationErrors,
  userController.createUser
);
router.put(
  '/:id',
  snakeCaseRequest,
  userValidationRules,
  handleValidationErrors,
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

export default router;
