/*
 * @Directives   questRepeat
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Version      1.0.0
 * @Description  directive to perform some action on html elements as per our reuirement. 
 */
testApp.directive('questRepeat', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
    	setTimeout(function(){
    		var objDiv = document.getElementById("question-form");
	  		objDiv.scrollTop = objDiv.scrollHeight;
    	},500)
      
    }
  };
});
