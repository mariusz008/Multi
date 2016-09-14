(function(){

	var app = angular.module('guestResultListController', ["ngStorage", 'ngRoute']);

    app.controller('guestResultListController', ['$scope','$http', '$route', '$sessionStorage', '$log', function($scope, $http, $route, $sessionStorage, $log){ 
                    
                    var id = sessionStorage.getItem('compID');
                    $scope.runners = [];

                    $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+id)
                    .success(function(data){
                        $scope.runners = data;
                        $scope.timesColumn = [];

                        for(var i=0;i<$scope.runners[0].POINTS_COUNT;i++)
                        {
                            $scope.timesColumn[i] = i+1;
                        }

                        for(var i=1; i < $scope.runners.length; i++)
                        {
                            $scope.runners[i].MIEJSCE = i;

                            $scope.runners[i].TIMES = new Array($scope.runners[0].POINTS_COUNT);
                            for(var j=0; j<$scope.runners[0].POINTS_COUNT; j++)
                            {
                                var timeName = '$scope.runners[i].POINT'+(j+1)+'_TIME';
                                $scope.runners[i].TIMES[j] = eval(timeName);
                            }
                        }
                                         
                    })
                    
                    .error(function(data,status,headers,config){
                        $scope.retInfo = 'Błąd!'+ data;
                    });

                    

                    $scope.showGuestRunnersList = function(){
                        sessionStorage.setItem('compID', id);
                        window.location = '/guestRunnerList.html'; 
                    }
           
    }])


})();