const express = require('express');
const router = express.Router();

// importing individual routes
const users = require('./routes/users.ts');
const comments = require('./routes/comments.ts');
const orders = require('./routes/orders.ts');
const payments = require('./routes/payments.ts');
const groups = require('./routes/groups.ts');

// actual routing of endpoints
router.use('/users', users)
router.use('/comments', comments)
router.use('/orders', orders)
router.use('/payments', payments)
router.use('/groups', groups)


module.exports = router;