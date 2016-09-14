(function(){

	var app = angular.module('registrationController', []);

	app.controller('registrationController', ['$scope', '$http','$log','$window', function($scope, $http,$log,$window){

                    $scope.sex = [
                        'Mężczyzna',
                        'Kobieta'
                    ]

                    $scope.user = {
                        name : null,
                        surname : null,
                        login : null,
                        password : null,
                        email : null,
                        age : null,
                        sex : null,
                        club : null,
                        obywatelstwo : null,                        
                        nr_tel : null,
                        ice : null

                    };

                    $scope.requestResult = "";
                    $scope.registrationClick = function(){
                        var sex = '';
                    	
                    	if($scope.user.sex == 'Mężczyzna'){
                    		sex = 'M';
                    	}
                    	
                    	else{
                    		sex = 'K';
                    	}
                    	
                        $http.put('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/user?name='+ $scope.user.name+
                                                                            '&surname=' +$scope.user.surname+
                                                                            '&login='+$scope.user.login+
                                                                            '&password='+$scope.user.password+
                                                                            '&email='+$scope.user.email+
                                                                            '&age=' + $scope.user.age +
                                                                            '&sex='+ sex +
                                                                            '&club=' + $scope.user.club +
                                                                            '&obywatelstwo=' + $scope.user.obywatelstwo +
                                                                            '&nr_tel=' + $scope.user.nr_tel + 
                                                                            '&ice=' + $scope.user.ice)
                            .success(function (data, status, headers) {
                                
                                if(data.content=="User added")
                                {
                                $scope.requestResult = "Gratulacje! Zostałeś zarejestrowany w systemie MultiJustRace! Na Twój adres e-mail została wysłana wiadomośc z linkiem aktywacyjnym. Kliknij w niego aby aktywować swoje konto.";
                                $window.scrollTo(0, 0);
                               /* $scope.user.name = "";
                                $scope.user.surname = "";
                                $scope.user.login = "";
                                $scope.user.password = "";
                                $scope.user.email = "";
                                $scope.user.age = "";
                                $scope.user.sex = "";
                                $scope.user.club = "";
                                $scope.user.obywatelstwo = "";
                                $scope.user.nr_tel = "";
                                $scope.user.ice = "";*/
                                }
                                else
                                    { $window.scrollTo(0, 0);
                                      $scope.requestResult = data.content;}
                               
                            })
                            .error(function (data, status, header, config) {
                                $window.scrollTo(0, 0);
                                $scope.requestResult ='Błąd!' + data;
                                    
                            });
                    };                
                
            }]) 

		 app.directive('pwCheck', [function () {
        	return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                        });
                });
        }
        }
    }]);   


})();