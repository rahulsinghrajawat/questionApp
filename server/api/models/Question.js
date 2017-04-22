/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName : "questions",
  autoUpdatedAt : false,
  attributes: {
  	id:           { type: 'interger', autoIncrement: true  },
  	title: 	   	   		{ type: 'string',  },
  	answer: 		    { type: 'json'},
  	answer_type: 		{ type: 'string'}
  }
};

