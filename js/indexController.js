(function(){

	var app = angular.module('indexController', ["ngStorage"]);

    app.controller('indexController', ['$scope', '$http', '$log', '$sessionStorage', function($scope, $http, $log, $sessionStorage){

        var competitionsFilter =[];
        $scope.competitions = [];
        $scope.diffDate =[];


        $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest/rest/competition/all?type=&name=&place=')
			.success(function(data){
			competitionsFilter = data;

			var datePattern = /(\d{2}).(\d{2}).(\d{4})/;			
			var counter = 0;

			for(var i=0; i<competitionsFilter.length; i++)
			{	
				var today = new Date();
				var compDate = new Date(competitionsFilter[i].DATA_ROZP.replace(datePattern, '$3, $2, $1'));
				var compTime = competitionsFilter[i].CZAS_ROZP.split(":");
				compDate.setHours(compTime[0]);
				compDate.setMinutes(compTime[1]);
				
				if(today <= compDate)
				{
					$scope.competitions.push(competitionsFilter[i]);
					today.setHours(0);
					today.setMinutes(0);
					today.setSeconds(0);
					today.setMilliseconds(0);
					compDate.setHours(0);
					compDate.setMinutes(0);
					compDate.setSeconds(0);
					compDate.setMilliseconds(0);
					$scope.competitions[counter].DIFF = Math.floor((compDate - today) / (1000*60*60*24))
					counter++;
				}

				if(counter>7)
					break;
			}

		    })			
			.error(function(data,status,headers,config){
			$scope.retInfo = 'Błąd!'+ data;
			})


		$scope.showGuestCompetitionDetails = function(id){
			sessionStorage.setItem('compID', id);
			window.location = '/guestCompetitionDetails.html';			
		}

    }])


})();