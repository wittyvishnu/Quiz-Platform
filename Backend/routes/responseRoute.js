const express = require('express');
const { submitResponse, viewResponses, getPublicResponsesByName } = require('../controllers/responseController');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/responses', submitResponse);
router.get('/responses/:quiz_id', authenticateUser, viewResponses);
router.get('/responses/public/:quiz_id/:name', getPublicResponsesByName);

module.exports = router;