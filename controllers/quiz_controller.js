var models = require('../models/models.js');
var timeController=require('./time_controller');

//AUTOLOAD: Factoriza el código si la ruta contiene :quizId 
exports.load=function(req, res, next, quizId){ 
	models.Quiz.find({
		where: {id:Number(quizId)},
		include: [{model: models.Comment}]
	}).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			}
			else{
				next(new Error('No existe el quizId='+quizId));
			}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
exports.index=function(req, res){
	timeController.comprobarConexion(req,res);
	var pregunta='';
	if(req.query.search!=""){
      pregunta=(req.query.search||"").replace(" ","%");
	}
	models.Quiz.findAll({where:['pregunta like ?','%'+pregunta+'%'],order:'pregunta ASC'}).then(
		function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		}
	).catch(function(error){next(error);});
};

//GET /quizes/:id
exports.show=function(req, res){
	timeController.comprobarConexion(req,res);
	res.render('quizes/show',{quiz: req.quiz, errors: []});
};

//GET /quizes/:id/answer
exports.answer=function(req, res){
	timeController.comprobarConexion(req,res);
	var resultado ='Incorrecto';
	if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto!!';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
	
};

exports.new=function(req, res){
	timeController.comprobarConexion(req,res);
	var quiz=models.Quiz.build(//Crea objeto build
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create=function(req, res){
	timeController.comprobarConexion(req,res);
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz: quiz, errors: err.errors });
		}
		else{
			//guarda en BD
			quiz.save({fields:["pregunta","respuesta", "tema"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
	
};

exports.edit=function(req, res){
	timeController.comprobarConexion(req,res);
	var quiz=req.quiz;
	
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update=function(req, res){
	timeController.comprobarConexion(req,res);
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
		}
		else{
			req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
};

exports.destroy=function(req,res){
	timeController.comprobarConexion(req,res);
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
};

//GET /author
exports.author=function(req, res){
	timeController.comprobarConexion(req,res);
	res.render('author',{aut: 'Mª Elena Morales', errors: []});
};