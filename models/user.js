const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	let now = Date.now
   
  	this.updatedAt = now
  	// Set a value for createdAt only if it is null
  	if (!this.createdAt) {
    	this.createdAt = now
  	}
	
	next();
});

module.exports = mongoose.model('User', UserSchema);