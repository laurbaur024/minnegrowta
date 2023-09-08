const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const commentRoutes = require('./comments.routes');
const flowerRoutes = require('./flower.routes');
const forumRoutes = require('./forum.routes');
const journalRoutes = require('./journal.routes');
const plantroutes = require('./plant.routes');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/flower', flowerRoutes);
router.use('/forum', forumRoutes);
router.use('/journal', journalRoutes);
router.use('/plant', plantroutes);

module.exports = router;
