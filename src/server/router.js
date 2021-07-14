const express = require('express');
const router = express.Router();

// importing individual routes
const users = require('./routes/users.ts');
const comments = require('./routes/comments');
const orders = require('./routes/orders.ts');
const payments = require('./routes/payments.ts');

// actual routing of endpoints
router.use('/users', users)
router.use('/comments', comments)
router.use('/orders', orders)
router.use('/payments', payments)


module.exports = router;