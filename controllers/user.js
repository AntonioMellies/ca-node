const userModel = require('../models/user');


    module.exports = {
        getById: function(req, res, next) {
            console.log(req.body);
            userModel.findById(req.params.userId, function(err, userInfo){
                if (err) {
                    next(err);
                } else {
                    res.json({status:"success", message: "User found!!!", data:{movies: movieInfo}});
                }
            });
        },
    
        getAll: function(req, res, next) {
            let userList = [];
    
            userModel.find({}, function(err, users){
                if (err){
                    next(err);
                } else{
                    for (let user of users) {
                        userList.push({id: user._id, name: user.name, email: user.email});
                    }
                    res.json({status:"success", message: "Users list found!!!", data:{users: userList}});
                                
                }
    
            });
        },
    
        updateById: function(req, res, next) {
            userModel.findByIdAndUpdate(req.params.userId,{name:req.body}, function(err, userInfo){
    
                if(err)
                    next(err);
                else {
                    res.json({status:"success", message: "User updated successfully!!!", data:null});
                }
            });
        },
    
        deleteById: function(req, res, next) {
            userModel.findByIdAndRemove(req.params.userId, function(err, movieInfo){
                if(err)
                    next(err);
                else {
                    res.json({status:"success", message: "User deleted successfully!!!", data:null});
                }
            });
        },
    
        create: function(req, res, next) {
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
                if (err) {
                    next(err);
                } else {
                    res.json({status: "success", message: "User added successfully!!!", data: null});
                }
            });
        },
    
    }	