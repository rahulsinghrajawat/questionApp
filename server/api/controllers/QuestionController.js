/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function(req,res){		
		var request = req.body;
		Question.create(request)
		.exec(function(err,docs){
			sails.log(err,docs);
			return res.json({status: true, data: docs})
		})
	},

	list: function(req,res){
		Question.find()
		.exec(function(err,docs){
			sails.log(err,docs);
			return res.json({status: true, data: docs})
		})
	}
};

