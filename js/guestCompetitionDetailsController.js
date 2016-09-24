(function(){

	var app = angular.module('guestCompetitionDetailsController', ["ngStorage", 'ckeditor', 'ngRoute','uiGmapgoogle-maps']);

    app.controller('guestCompetitionDetailsController', ['$scope', '$http', '$log', '$sessionStorage','$route', function($scope, $http, $log, $sessionStorage,$route){
		
$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

		// Editor options.
        $scope.options = {
          language: 'pl',
          allowedContent: true,
          entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
        	CKEDITOR.instances['editor'].setReadOnly(true);
        	
        	var temp = CKEDITOR.instances['editor'].id + "_top";
        	
        	var bar = document.getElementById(temp);
            bar.style.display = "none";
            
            temp = CKEDITOR.instances['editor'].id + "_bottom";
            
            bar = document.getElementById(temp);
            bar.style.display = "none";
        }
            	
    	$scope.competition = [];
        $scope.id = sessionStorage.getItem('compID');
        
        $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/all?type=&name=&place=&wieloetapowe='+ $scope.id)
                                .success(function(data1){
                                $scope.competition1 = data1;

                                })
                    .error(function(data,status,headers,config){
                                    $scope.retInfo = 'Błąd!'+ data;
                    });

            $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition?id=' + $scope.id)
            .success(function(data){
                $scope.competition = data;
            })            
            .error(function(data,status,headers,config){
                $scope.retInfo = 'Błąd!'+ data;
            });

            $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/gps/all?competition_id=' + $scope.id)
            .success(function(data){
                $scope.map = data;
            })            
            .error(function(data,status,headers,config){
                $scope.retInfo = 'Błąd!'+ data;
            });


            $scope.showGuestRunnersList = function(){
                sessionStorage.setItem('compID', $scope.id);
                sessionStorage.setItem('compName', $scope.competition.NAME);
                sessionStorage.setItem('compPay', $scope.competition.OPLATA);
                window.location = '/Multi/guestRunnerList.html';
            }

            $scope.showGuestResultList = function(){
                sessionStorage.setItem('compID', $scope.id);
                sessionStorage.setItem('compName', $scope.competition.NAME);
                sessionStorage.setItem('compPay', $scope.competition.OPLATA);
                window.location = '/Multi/guestResultList.html';
            }
            $scope.showStage = function(){
             sessionStorage.setItem('compID1', $scope.id);
            $location.path('/Multi/home/competitions/stages');
             }

     
    }])



})();