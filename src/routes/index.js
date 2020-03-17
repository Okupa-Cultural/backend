const { Router } = require('express');
const router = Router();

let postRoutes = require('./post');
let commentRoutes = require('./comment');
let signInUpOutRoutes = require('./user');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/', signInUpOutRoutes);

module.exports = router;