const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const adminRouter = require('./admins');
const projectRouter = require('./projects');

router.use('/auth', authRouter);
router.use('/admins', adminRouter);
router.use('/projects', projectRouter);

module.exports = router;
