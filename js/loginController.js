(function(){

	var app = angular.module('loginController', ["ngStorage"]);

	app.controller('loginController', ['$scope', '$http', '$sessionStorage', '$log' , '$location', function($scope, $http, $sessionStorage, $log, $location){ 

        if(sessionStorage.getItem('RememberMe') != null)
        {
            $scope.user = {
            login : sessionStorage.getItem('RememberMe')
            }; 
        }

        
           
        var response = [];

        $scope.loginClick = function(){

            $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/user/login?login='+ $scope.user.login +
                                                                        '&password='+ $scope.user.password)

            .success(function(data){
                response = data;
                if(response.ACTIVATE == 'true')
                {
                	//sessionStorage.setItem('MultiJustRace', response);
                	var sex = '';

                	if(response.PLEC == 'M'){
                		sex = 'Mężczyzna'
                	}

                	else{
                		sex = 'Kobieta';
                	}

                    sessionStorage.setItem('IMIE', response.IMIE);
                    sessionStorage.setItem('ICE', response.ICE);
                    sessionStorage.setItem('ACTIVATE', response.ACTIVATE);
                    sessionStorage.setItem('OBYWATELSTWO', response.OBYWATELSTWO);
                    sessionStorage.setItem('NR_TEL', response.NR_TEL);
                    sessionStorage.setItem('NAZWISKO', response.NAZWISKO);
                    sessionStorage.setItem('ID', response.ID);
                    sessionStorage.setItem('EMAIL', response.EMAIL);
                    sessionStorage.setItem('KLUB', response.KLUB);
                    sessionStorage.setItem('CODE', response.CODE);
                    sessionStorage.setItem('PLEC', sex);
                    sessionStorage.setItem('WIEK', response.WIEK);
                    sessionStorage.setItem('RememberMe', $scope.user.login);

                    window.location = 'Multi/Multi/home/main.html';
                }
                else
                {
                    $scope.retInfo = response.MESSAGE;

                }


            })
            .error(function(data,status,headers,config){

                $scope.retInfo = 'Błąd!'+ data;

            })
        }
                       
                    
    }])

    app.controller('remindController', ['$scope','$http', function($scope, $http){
                    
            $scope.remindClick = function(){

                $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/user/password?login='+ $scope.user.login +
                                                                        '&email='+ $scope.user.email)
                 .success(function(data){
                    $scope.remindInfo = data.content;
                })
                .error(function(data,status,headers,config){

                    $scope.remindInfo = 'Błąd!'+ data.content;                
                })

            }

    }]) 


})();