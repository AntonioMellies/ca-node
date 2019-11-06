const config = require('../config');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

exports.authenticate = 
    function(req, res, next) {
        userModel.findOne({email:req.body.email}, 
            function(err, userInfo){
					if (err) {
						next(err);
					} else {
						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
							const token = jwt.sign({id: userInfo._id, email:userInfo.email },
													config.TOKEN_SECRET,
													{expiresIn: config.TOKEN_TIME_EXPIRES}); 
						    res.json({status:"success", message: "user found!!!",token:token});	
						}else{
						    res.json({status:"error", message: "Invalid email/password!!!"});
						}
					}
                }
            );
	}