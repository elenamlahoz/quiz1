//Definición del modelo de quiz
module.exports=function(sequelize, Datatypes){
	return sequelize.define('Quiz',{
		pregunta:DataTypes.STRING,
		respuesta:DataTypes.STRING,
	});
}