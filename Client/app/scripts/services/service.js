/*
 * @Service      apiService
 * @Package      Angular
 * @Author       Rahul Rajawat
 * @Params       $http, $q
 * @Version      1.0.0
 * @Description  This is http service to fetch data from external resource.
 */
testApp = angular.module("apiService", []);

testApp.service("apiService", ['$http', '$q',  function ($http, $q) {
    
    

    this.request = function(url,method,requestData,successCb,failureCb){        
            
            return $http(
                    {
                        method: method,
                        url: API_URL + url,
                        headers: {'Content-type': "application/json"},
                        data: requestData
                    }).then(function (response) {
                        return successCb(response);
                    }, function (error) {                        
                        return failureCb(error);
                    });
    }


	return this;

}]);