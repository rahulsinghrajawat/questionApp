'use strict';
/*
 * @Controller   globalController
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Params       $scope, $location, apiService, $q, $route, $sce
 * @Version      1.0.0
 * @Description  Global controller added to <html> element in index.html , this controller
                 has global scope. 
 */
testApp
	.controller('globalController',['$scope', '$location','apiService','$q','$route', function($scope, $location,apiService,$q,$route) {
		
		/*
			variables 
		*/	
		$scope.isLoader = false;
		$scope.questions = {};
		$scope.questionKeys = [];

		function init(){
			apiService.request(
				'questions/list',
				'GET',
				null,
				listSuccessCB,
				listFailureCB
			)
		}

		function listSuccessCB(response){
			console.log(response);
			var list = {}, quests = response.data.data;

			for(var i=0;i<quests.length;i++){
				var questKey = 'quest' + i;
				list[questKey] = {
					synced: true,
					title: quests[i].title,
					type: quests[i].answer_type == 1 ? 'textarea': 'text',
					fields: quests[i].answer,
					answer_type: quests[i].answer_type

				}
				$scope.questionKeys.push(questKey);

			}
			$scope.questions = list;

			console.log($scope.questions,$scope.questionKeys)

		}

		function listFailureCB(error){
			console.log(error);
			//for(var i=0;i<response.data;i++)
		}

		/*
			Api Service : apiService
			Method      : fetchData()
			Params		: -
			Response 	: response (Json Object)
			Description : http service to fetch data from external or given resources. 
		*/
		$scope.addNewQuestion = function(){
			var questCount = $scope.questionKeys.length;
			var questKey = 'quest' + questCount;			
			$scope.questionKeys.push(questKey)
			
			$scope.questions[questKey] = {};
			
			console.log($scope.questions,$scope.questionKeys)
			scrolTobottom();
		
		}

		$scope.getChoice = function(){
			console.log(this);
			var questObj = $scope.questions[this.key];
			questObj.choice = this.choiceType;
			
			var textFieldCount = 0, type='text';
			if(this.choiceType == 1){
				textFieldCount = 1;
				type = 'textarea';
			}
			else if(this.choiceType == 2){
				textFieldCount = 1;

			}
			else if(this.choiceType == 3){
				textFieldCount = 5;
			}
			questObj.fields = [];
			for(var i=0; i<textFieldCount;i++){
				questObj.fields[i] = {
					type: type,
					value: "",
					subQuestions: {}
				};
			}

			console.log(questObj);
			scrolTobottom();
		}

		$scope.addSubQuestion = function(key,index){
			var questObj = $scope.questions[key];
			console.log(questObj);
			var subKey = "subquest" + Object.keys(questObj.fields[index].subQuestions).length;
			questObj.fields[index].subQuestions[subKey] = {};
			scrolTobottom()
			
		}

		$scope.getSubQChoice = function(subQuest){
			console.log(this,subQuest);
			var subQObj = subQuest.subQuestions[this.subKey];
			
			subQObj.choice = this.subChoiceType;
			
			var textFieldCount = 0, type='text';
			if(this.subChoiceType == 1){
				textFieldCount = 1;
				type = 'textarea';
			}
			else if(this.subChoiceType == 2){
				textFieldCount = 1;

			}
			else if(this.subChoiceType == 3){
				textFieldCount = 5;
			}
			subQObj.fields = [];
			for(var i=0; i<textFieldCount;i++){
				subQObj.fields[i] = {
					type: type,
					value: ""					
				};
			}

			console.log(subQuest);
			scrolTobottom()
		}

		$scope.save = function(){
			console.log($scope.questions);
			var payload = [];
			for(var key in $scope.questions){
				var quest = $scope.questions[key];
				if(!quest.synced){
					quest.synced = true;
					payload.push({
						title: quest.title,
						answer_type: quest.choice,
						answer: quest.fields
					})
				}
				
			}
			console.log(payload);
			$scope.isLoader = true;
			apiService.request(
				'question/save',				
				'POST',
				payload,
				saveSuccessCB,
				saveFailureCB
			)
		}

		function saveSuccessCB(response){
			$scope.isLoader = false;
			console.log("saveSuccessCB",response)
		}

		function saveFailureCB(error){
			$scope.isLoader = false;
			console.log("saveFailureCB",error)
		}

		function scrolTobottom(){
			setTimeout(function(){
				var objDiv = document.getElementById("question-form");
				objDiv.scrollTop = objDiv.scrollHeight;
			},200)
			
		}

		init();
		
		

	}])	
	