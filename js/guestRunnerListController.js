(function(){

	var app = angular.module('guestRunnerListController', ["ngStorage", 'ngRoute']);

    app.controller('guestRunnerListController', ['$scope','$http', '$route', '$sessionStorage', '$log', function($scope, $http, $route, $sessionStorage, $log, $timeout){ 




        $scope.runners = [
                            {IMIE : ''},
                            {NAZWISKO : ''},
                            {COMPETITION_ID : ''},
                            {USER_ID: ''},
                            {OPLACONE: ''}
                            ];
                            
        $scope.plci = [{nazwa: 'kobieta'}, {nazwa: 'mężczyzna'}];
        $scope.cat = [{NAME: ''}, {DESCRIPTION : ''}];
        
        var id = sessionStorage.getItem('compID');
        $scope.competitionName = sessionStorage.getItem('compName');
        sessionStorage.removeItem('competitionName');
        $scope.compPay = sessionStorage.getItem('compPay');
        
        $scope.showGuestResultList = function(){
                sessionStorage.setItem('compID', id);
                sessionStorage.setItem('compName', $scope.competitionName);
                window.location = '/Multi/guestResultList.html';
            }

            $scope.init = function() {
                
                $scope.init2();
                
                var sex = '';
                
                $scope.search = 0;
                $scope.check = 0;
                $scope.btnText = 'Rozwiń filtry wyszukiwania';
                
                $scope.spr = sessionStorage.getItem('hide');
                $scope.age = sessionStorage.getItem('age');
                $scope.sex = sessionStorage.getItem('sex');
                $scope.phrase = sessionStorage.getItem('phrase');
                $scope.cat.NAME = sessionStorage.getItem('category');
                               
                sessionStorage.removeItem('hide');
                sessionStorage.removeItem('age');
                sessionStorage.removeItem('sex');
                sessionStorage.removeItem('phrase');
                sessionStorage.removeItem('category');

                $scope.print = function() {
                    if( $scope.search == 1 ) {
                        $scope.btnText = 'Rozwiń filtry wyszukiwania';
                        $scope.search = 0;
                    }
                    
                    else {
                        $scope.btnText = 'Zwiń filtry wyszukiwania';
                        $scope.search = 1;
                    }
                    
                };
     
                
                if($scope.spr != null)
                    $scope.print();
                
                if($scope.age == null)
                    $scope.age = '';
                
                if($scope.sex == null)
                    sex = '';
                    
                    if($scope.phrase == null)
                        $scope.phrase = '';
                    
                    if($scope.cat.NAME == null)
                        $scope.cat.NAME = '';
                    
                    if($scope.sex == 'kobieta') {
                        sex = 'K';
                        $scope.sex = $scope.plci[0];
                    }
                    
                    if($scope.sex == 'mężczyzna') {
                        sex = 'M';
                        $scope.sex = $scope.plci[1];
                    }
                    
                    /*$log.log('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/event/list?competition_id=' + id +
                            '&sex=' + sex + '&age=' + $scope.age + '&phrase=' + $scope.phrase + '&category=' + $scope.cat.NAME);*/
                    
                    $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/event/list?competition_id=' + id +
                                                                                                        '&sex=' + sex + '&age=' + $scope.age + '&phrase=' + $scope.phrase + '&category=' + $scope.cat.NAME)
                    .success(function(data){
                        $scope.runners = data;
                    })
                    
                    .error(function(data,status,headers,config){
                        $scope.retInfo = 'Błąd!'+ data;
                    });
            }
            
                   
            $scope.s = function() {
                
                if($scope.sex != null) {
                    sessionStorage.setItem('sex', $scope.sex.nazwa);
                }
                
                sessionStorage.setItem('age', $scope.age);
                sessionStorage.setItem('phrase', $scope.phrase);
                
                if($scope.cat != null) {
                    sessionStorage.setItem('category', $scope.cat.NAME);
                }
                
                sessionStorage.setItem('hide', 0);
                var ind = $scope.categories.indexOf($scope.cat);
                sessionStorage.setItem('ind', ind);

                $route.reload();
            };
            
            $scope.w = function() {
                $route.reload();
            };
            
            $scope.init2 = function() {
                $scope.check = 0;
                
                $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/category/list?competition_id=' + id)
                .success(function(data){
                    $scope.categories = data;
                    if($scope.categories == "") {
                        $scope.check = 1;
                    }
                    
                    var ind = sessionStorage.getItem('ind');
                    
                    if(ind != null)
                        $scope.cat = $scope.categories[ind];
                    
                    sessionStorage.removeItem('ind');
                })
                
                .error(function(data,status,headers,config){
                    $scope.retInfo = 'Błąd!'+ data;
                });
            };
            
            
    }])


})();