const express = require('express');
const { createQuiz, getAllQuizzes, getQuizById } = require('../controllers/quizController');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/quizzes', authenticateUser, createQuiz);
router.get('/quizzes', authenticateUser, getAllQuizzes);
router.get('/quizzes/:quiz_id', getQuizById);

module.exports = router;