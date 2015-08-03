var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');

var autController=require('../controllers/aut_controller');

//Página de entrada
router.get('/',function(req,res){
	res.render('index', {title: 'Quiz'});
});

router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


router.get('/author', autController.author);

module.exports = router;
