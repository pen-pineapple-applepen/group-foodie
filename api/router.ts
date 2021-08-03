import express from 'express';

// importing individual routes.ts
import users from './modules/users/routes.ts';
import comments from './modules/comments/routes.ts';
import orders from './modules/orders/routes.ts';
import payments from './modules/payments/routes.ts';
import groups from './modules/groups/routes.ts';
import restaurants from './modules/restaurants/routes.ts';

const router = express.Router();

// actual routing of endpoints
router.use('/users', users);
router.use('/comments', comments);
router.use('/orders', orders);
router.use('/payments', payments);
router.use('/groups', groups);
router.use('/restaurants', restaurants);

export default router;
