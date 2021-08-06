import express from 'express';

// importing individual routes
import users from './modules/users/routes';
import comments from './modules/comments/routes';
import orders from './modules/orders/routes';
import payments from './modules/payments/routes';
import groups from './modules/groups/routes';
import restaurants from './modules/restaurants/routes';

const router = express.Router();

// actual routing of endpoints
router.use('/users', users);
router.use('/comments', comments);
router.use('/orders', orders);
router.use('/payments', payments);
router.use('/groups', groups);
router.use('/restaurants', restaurants);

export default router;
