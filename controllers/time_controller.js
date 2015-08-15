
//Comprueba si el usuario está registrado en users
//Si la autenticacion falla o hay errores se ejecuta callback(error)
exports.comprobarConexion=function(req,res){
	var sesionController=require('./session_controller');
	if((req.session.user||false)&&(req.session.conexion||false)){
		//2 minutos -> 120000 milisegundos
		var fechaActual=new Date();
		var fechaSesion=(new Date()).setTime(req.session.conexion);
		if((fechaActual-fechaSesion)>120000){
			req.session.conexion=null;
			res.redirect("/logout");
		}
		else{
			req.session.conexion=fechaActual.getTime();
		}
	}
	return true;
}