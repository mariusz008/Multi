(function(){

	var app = angular.module('guestStagesController', ["ngStorage", 'ngRoute', 'naif.base64']);

    app.controller('guestStagesController', ['$scope', '$http', '$log', '$sessionStorage','$route','$window', function($scope, $http, $log, $sessionStorage,$route, $window){
		
        $scope.search = 0;
        $scope.btnText = 'Rozwiń filtry wyszukiwania';
        $scope.compID = sessionStorage.getItem('compID1');
        $scope.response = [];
        sessionStorage.removeItem('NAME');
        $scope.types = [
                        {name:'Bieg przełajowy' ,type:'Biegi'},
                        {name:'Bieg maratoński' ,type:'Biegi'},
                        {name:'Bieg uliczny' ,type:'Biegi'},
                        {name:'Bieg górski' ,type:'Biegi'},
                        {name:'Chód' ,type:'Biegi'},
                        {name:'Kolarstwo szosowe' ,type:'Rowerowe'},
                        {name:'Kolarstwo górskie' ,type:'Rowerowe'},
                        {name:'Bieg narciarski' ,type:'Narciarskie'},
                        {name:'Narciarstwo alpejskie' ,type:'Narciarskie'},
                        {name:'Wyścig samolotów' ,type:'Powietrzne'},
                        {name:'Wyścig balonów' ,type:'Powietrzne'},
                        {name:'Wyścig samochodowy' ,type:'Motorowe'},
                        {name:'Wyścig off-road' ,type:'Motorowe'},
                        {name:'Karting' ,type:'Motorowe'},
                        {name:'Wyścig motocykli' ,type:'Motorowe'},
                        {name:'Wyścig quadów' ,type:'Motorowe'},
                        {name:'Wyścig skuterów śnieżnych' ,type:'Motorowe'},
                        {name:'Kajakarstwo' ,type:'Wyścigi łodzi'},
                        {name:'Wioślarstwo' ,type:'Wyścigi łodzi'},
                        {name:'Inne' ,type:'Inne'}
                        ];
        
        
        
        $scope.init = function() {
            $scope.t = [{name: '', type: ''}];
            
            $scope.spr = sessionStorage.getItem('hide');
            var temp = sessionStorage.getItem('type_name');
            $scope.t = sessionStorage.getItem('type');
            $scope.name = sessionStorage.getItem('name');
            $scope.place = sessionStorage.getItem('place');
            
            sessionStorage.removeItem('type');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('place');
            sessionStorage.removeItem('hide');
            sessionStorage.removeItem('type_name');

            if($scope.spr != null)
                $scope.print();
            
            if(!($scope.t == null) && !($scope.t == 'undefined')) {
                for(i = 0; i < $scope.types.length; i++) {
                    if(temp == $scope.types[i].name) {
                        $scope.t = $scope.types[i];
                        break;
                    }
                }
            }
            
            if(temp == null || temp == 'undefined')
                temp = '';
            
            if($scope.name == null)
                $scope.name = '';
            
            if($scope.place == null)
                $scope.place = '';
            
            $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/all?type=' + temp +
                    '&name=' + $scope.name +
                    '&place=' + $scope.place +
                    '&wieloetapowe='+$scope.compID)
            .success(function(data){
            $scope.response = data;            
            
            var datePattern = /(\d{2}).(\d{2}).(\d{4})/;
            $scope.countFinded = $scope.response.length;
            $scope.countActive = 0;
            $scope.competitions = [];

            for(var i=0; i<$scope.response.length; i++)
            {   

                var today = new Date();
                var compDate = new Date($scope.response[i].DATA_ROZP.replace(datePattern, '$3, $2, $1'));
                var compTime = $scope.response[i].CZAS_ROZP.split(":");
                compDate.setHours(compTime[0]);
                compDate.setMinutes(compTime[1]);
                $scope.competitions.push($scope.response[i]);

                if(today <= compDate)
                {
                    
                    today.setHours(0);
                    today.setMinutes(0);
                    today.setSeconds(0);
                    today.setMilliseconds(0);
                    compDate.setHours(0);
                    compDate.setMinutes(0);
                    compDate.setSeconds(0);
                    compDate.setMilliseconds(0);
                    $scope.competitions[i].DIFF = Math.floor((compDate - today) / (1000*60*60*24));
                    $scope.countActive++;
                }
                else
                {
                    $scope.competitions[i].DIFF = -1;
                }
            }


            for(i = 0; i < $scope.response.length; i++) {
                var miesiac = $scope.response[i].DATA_ROZP.substr(3, 2);
                var rok = $scope.response[i].DATA_ROZP.substr(6, 4);

                if(miesiac.charAt(0) == '0')
                    miesiac = miesiac.substr(1, 1);
                
                $scope.response[i].MIESIAC = miesiac;
                $scope.response[i].ROK = rok;
            }
            
            var year = new Date().getFullYear();
            
            var month = 1;
            
            var months = new Array(14);
            
            for(i = 0; i < 14; i++)
                months[i] = 0;
            
            for(i = 0; i < $scope.response.length; i++) {
                if(parseInt(year) > parseInt($scope.response[i].ROK))
                    months[0]++;
                
                if(parseInt(year) == parseInt($scope.response[i].ROK))
                    months[parseInt($scope.response[i].MIESIAC)]++;
                
                if(parseInt(year) < parseInt($scope.response[i].ROK))
                    months[13]++;
            }

            $scope.pages = new Array(14);
            
            for (var i = 0; i < 14; i++) {
                $scope.pages[i] = new Array(months[i]);
            }
            
            var all = $scope.response;
            
            for(i = 0; i < 14; i++)
                $scope.pages[i] = all.splice(0, months[i]);
            
            $scope.show = new Array(14);
            $scope.btn = new Array(14);
            $scope.style = new Array(14);
            
            for(i = 0; i < 14; i++) {
                $scope.btn[i] = 'btn btn-primary';
                $scope.style[i] = 'background-color: #222933;';
            }

            if($scope.spr == null) {
                month = new Date().getMonth();
                $scope.changePage(++month);
            }
            
            else
                $scope.changePage(15);
            
            })
            
            .error(function(data,status,headers,config){
            $scope.retInfo = 'Błąd!'+ data;
            })
        };
        
        $scope.s = function() {
            sessionStorage.setItem('type', $scope.t);
            
            if($scope.t != null)
                sessionStorage.setItem('type_name', $scope.t.name);
                
            sessionStorage.setItem('name', $scope.name);
            sessionStorage.setItem('place', $scope.place);
            sessionStorage.setItem('hide', 1);
            
          $window.location.reload();
        };
        
        $scope.w = function() {
            $window.location.reload();
        };
            
            
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
            
            $scope.changePage = function(nr) {
                if(nr == 15) {
                    for(i = 0; i < 14; i++) {
                        $scope.show[i] = 1;
                        $scope.style[i] = 'background-color: white; color: black;';
                    }
                }
                
                else {
                    for(i = 0; i < 14; i++) {
                        $scope.show[i] = 0;
                        $scope.style[i] = 'background-color: white; color: black;';
                    }
                    
                    $scope.show[nr] = 1;
                    $scope.style[nr] = 'background-color: #233859';
                }
            };



        $scope.openPage1 = function(id){
            sessionStorage.setItem('compID', id);
            window.location = '/Multi/guestStageDetails.html';
        }
        
    }])


})();