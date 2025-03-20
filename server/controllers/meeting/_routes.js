const express = require('express');

const meeting = require('./controller');
const auth = require('../../middelwares/auth');
const asyncWrapper = require('../../middelwares/async-wrapper');

const router = express.Router();

router.post('/add', auth, asyncWrapper(meeting.add));
router.get('/', auth, asyncWrapper(meeting.index));
router.get('/view/:id', auth, asyncWrapper(meeting.view));
router.delete('/delete/:id', auth, asyncWrapper(meeting.deleteData));
router.post('/deleteMany', auth, asyncWrapper(meeting.deleteMany));

module.exports = router;
