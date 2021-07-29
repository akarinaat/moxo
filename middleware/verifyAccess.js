var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	var token = req.cookies.token || '';
	
	if (!token) {
		return res.redirect("/login");
	}
	else {
		jwt.verify(token, "moxoSecretSign", function(err, datos) { // La firma (abcd1234) tiene que ser la misma que en routeindex.js
			if (err) {
				console.log(err);
				return res.redirect("/login");
			}
			else {
				req.userId = datos.id; // datos es el Token
				req.permission = datos.permission;
				
				next();
			}
		}); 
	}
}

module.exports = verifyToken;