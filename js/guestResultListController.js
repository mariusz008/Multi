(function(){

	var app = angular.module('guestResultListController', ["ngStorage", 'ngRoute']);

    app.controller('guestResultListController', ['$scope','$timeout', '$filter','$http','$interval', '$route', '$sessionStorage', '$log', function($scope,$timeout, $filter, $http, $route,$interval, $sessionStorage, $log){
                    
                    var id = sessionStorage.getItem('compID');
                    $scope.runners = [];
                    $scope.hasStage = sessionStorage.getItem('dlugosc');
                    var id = sessionStorage.getItem('compID');
                                 var user_id = sessionStorage.getItem('ID');
                                 $scope.editActive = sessionStorage.getItem('editActive');
                                 $scope.hasStage = sessionStorage.getItem('stage');
                                       $scope.runners = [];
                                                     $scope.runnersDruz = [];
                                                     $scope.runners1 = [];
                                                     $scope.zawodnicy = [];
                                                     $scope.runners1 = [];
                                                     $scope.classPoints = [];
                                                     $scope.classPoints1 = [];
                                                      $scope.runners2 = [];
                                                     $scope.wyniki = [];
                                                     $scope.wynikii = [];
                                                     $scope.wyniki1 = [];
                                                     $scope.wynikiTimes = [];
                                                     $scope.timesColumn = [];
                                                     var zawody = new Array();
                                                     $scope.wynikOgolnych = [];
                                                     var czyWypelnic = 0;
                                                     $scope.idZawPunkt = 0;
                                                     $scope.zawodyKlasyfikacje = [];
                                                     $scope.zawodyKlasyfikacje1 = [];

                                 $scope.listaWynikow1 = [];
                                 var suma = 0;
                                             $scope.daneEtapow = [];
                                             var info = "";
                                             $scope.infoWielo = "";
                                             var m = 1;
                                             var n = 0;
                                             var cc;
                                 var ileZawodnikow = 0;
                                             $scope.types = [];
                                             $scope.classification = [
                                                            {name:'Klasyfikacja generalna' },
                                                            {name:'Klasyfikacja punktowa' },
                                                            {name:'Klasyfikacja generalna drużynowa' }
                                                                                   ];
                                                         var xd=0;
                                 $scope.retInfo = '';
                                 $scope.banned=[];
                                 $scope.runners = [];
                                 $scope.x = sessionStorage.getItem('wielo');
                                 $scope.name = sessionStorage.getItem('name');

                                 $scope.init = function() {
                                                 $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition?id=' + id)
                                                 .success(function(data1){
                                                  info = data1;
                                                  $scope.infoWielo = data1.WIELOETAPOWE;
                                                  if($scope.infoWielo==1){
                                                              $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/all?type=&name=&place=&wieloetapowe=' + id)
                                                                  .success(function(data){
                                                                  $scope.daneEtapow = data;
                                                                  $scope.wypelnijEtapy();
                                                                     })
                                                                 .error(function(data,status,headers,config){
                                                                  $scope.retInfo = 'Błąd!'+ data;
                                                                  // console.log('Błąd1!'+ data);
                                                                   });
                                                  }
                                                 else if($scope.infoWielo==0){
                                                     $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+id)
                                                     .success(function(data){
                                                         $scope.runners = data;
                                                         if($scope.runners[1] != null)
                                                         {
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
                                                         }
                                                     })
                                                     .error(function(data,status,headers,config){
                                                         $scope.retInfo = 'Błąd!'+ data;
                                                     });
                                                 }
                                              })
                                                 .error(function(data1,status,headers,config){
                                                 $scope.retInfo = 'Błąd!'+ data1;
                                                 });

                                                 $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/event/list?competition_id=' + id + '&sex=&age=&phrase=&category=')
                                                                     .success(function(data){
                                                                         $scope.zawodnicy = data;
                                                                     })

                                                                     .error(function(data,status,headers,config){
                                                                         $scope.retInfo = 'Błąd!'+ data;
                                                                     });
                                             }

                                        //wypelnijKlasyfikacje
                                                                               $scope.wypelnijKlasyfikacje = function(idZawodow) {
                                                                                    if($scope.daneEtapow[idZawodow] != undefined && $scope.competition.type.name!=(cc +". Ogólne")){
                                                                                    $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/classification?competition_id='+$scope.daneEtapow[idZawodow].COMPETITION_ID)
                                                                                                 .success(function(data){
                                                                                                                    $scope.classification.length=0;
                                                                                                                    $scope.classification = [
                                                                                                                                    {name:'Klasyfikacja generalna' }
                                                                                                                                           ];
                                                                                                // $scope.classification[1] = [name:'Klasyfikacja generalna']
                                                                                                 if(data.TYP != 'Klasyfikacja generalna') $scope.classification[1] = {name:data.TYP};
                                                                                                else $scope.classification.length=1;
                                                                                                 })
                                                                                                 .error(function(data,status,headers,config){
                                                                                                                                      $scope.retInfo = 'Błąd!'+ data;
                                                                                                                                 //     console.log('Błąd3!'+ data);
                                                                                                                                      });
                                                                                                                }
                                                                                                                }

                                                                              $scope.wypelnijEtapy = function() {
                                                                                                    for(var dd =0; dd<$scope.daneEtapow.length; dd++)
                                                                                                     {
                                                                                                                  $scope.types[dd]={id: dd, name:dd+1 +". " + $scope.daneEtapow[dd].NAME + " - " + $scope.daneEtapow[dd].DATA_ROZP};
                                                                                                     }
                                                                                                      cc = dd+1;
                                                                                                      $scope.types[dd]={name:cc +". Ogólne"};
                                                                                         }
                       //klasyfikacja generalna
                                                         $scope.wynikiGeneralnej = function(idZawodow) { czyWypelnic = 1;
                                                         if($scope.classification!=undefined && $scope.classification.type!=undefined && $scope.classification.length<3){
                                                          if(idZawodow!=undefined && $scope.classification.type.name=="Klasyfikacja generalna"){

                                                          czyWypelnic = 1;
                                                                                  $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.daneEtapow[idZawodow].COMPETITION_ID)
                                                                                 .success(function(data){
                                                                                  $scope.runners = data;
                                                                                  if($scope.runners[1] != null)
                                                                                  {
                                                                                  $scope.timesColumn = [];
                                                                                      for(var a=0;a<=$scope.runners[0].POINTS_COUNT;a++)
                                                                                      {
                                                                                         if(a<$scope.runners[0].POINTS_COUNT) $scope.timesColumn[a] = a+1;
                                                                                         if($scope.runners[a]!=undefined){
                                                                                           if($scope.runners[a].hasOwnProperty('NAZWISKO'))
                                                                                               {
                                                                                               for(var b=0; b<$scope.zawodnicy.length; b++){
                                                                                             if($scope.runners[a].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                                                                {
                                                                                                   $scope.runners[a].KLUB = $scope.zawodnicy[b].KLUB;
                                                                                                  // console.log($scope.runners[a].KLUB);
                                                                                                   //console.log(a+" "+b);
                                                                                                }
                                                                                               }
                     }}
                                                                                      }

                                                                                     for(var i=($scope.runners.length-1), k=1; i > 0, k<($scope.runners.length); i--, k++)
                                                                                      {
                                                                                          if($scope.runners[i] != undefined){
                                                                                                 if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                                         $scope.runners[i].MIEJSCE = k;
                                                                                                         $scope.runners[i].TIMES = new Array($scope.runners[0].POINTS_COUNT);
                                                                                                          for(var j=0; j<$scope.runners[0].POINTS_COUNT; j++)
                                                                                                          {
                                                                                                              var timeName = '$scope.runners[i].POINT'+(j+1)+'_TIME';
                                                                                                              $scope.runners[i].TIMES[j] = eval(timeName).substring(0,8);
                                                                                                          }
                                                                                                       }
                                                                                                  else {
                                                                                                  k--;
                                                                                                  }
                                                                                             }
                                                                                      }
                                                                                    //  console.log($scope.runners);
                                                                                  }
                                                             })
                                                          .error(function(data,status,headers,config){
                                                          $scope.retInfo = 'Błąd!'+ data;
                                                       //   console.log('Błąd3!'+ data);
                                                          });
                                              }
                                              }
                                              }

                                         //klasyfikcja druzynowa
                                         $scope.wynikiDruzynowej = function(idZawodow) { czyWypelnic = 1;
                                         if($scope.classification!=undefined && $scope.classification.type!=undefined && $scope.classification.length<3){
                                         $scope.druzyny = [];

                                          if(idZawodow!=undefined && $scope.classification.type.name=="Klasyfikacja generalna drużynowa"){

                                          czyWypelnic = 1;
                                                          $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.daneEtapow[idZawodow].COMPETITION_ID)
                                                                              .success(function(data){
                                                                                  $scope.runners = data;
                                                                                  if($scope.runners[1] != null)
                                                                                  {
                                                                                  $scope.timesColumn = [];
                                                                                      for(var a=0;a<$scope.runners[0].POINTS_COUNT;a++)
                                                                                      {
                                                                                          $scope.timesColumn[a] = a+1;
                                                                                             if($scope.runners[a].hasOwnProperty('NAZWISKO'))
                                                                                               {

                                                                                               for(var b=0; b<$scope.zawodnicy.length; b++){
                                                                                             if($scope.runners[a].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                                                                {
                                                                                                   $scope.runners[a].KLUB = $scope.zawodnicy[b].KLUB;
                                                                                                }
                                                                                               }
                                                                                             }
                                                                                      }
                                                                                         var x = $scope.runners[0].POINTS_COUNT;
                                                                                        $scope.runners = $filter('orderBy')($scope.runners, 'POINT'+x+'_TIME');
                                                                                     for(var i=0; i<($scope.runners.length); i++)
                                                                                      {
                                                                                          if($scope.runners[i] != undefined){
                                                                                                 if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                                         ileZawodnikow++;
                                                                                                         $scope.runners[i].MIEJSCE = i+1;
                                                                                                         $scope.runners[i].TIMES = new Array($scope.runners[0].POINTS_COUNT);
                                                                                                         $scope.runners[i].TIMES1 = new Array($scope.runners[0].POINTS_COUNT);
                                                                                                         for(var j=0; j<$scope.timesColumn.length; j++)
                                                                                                          {
                                                                                                              var timeName = '$scope.runners[i].POINT'+(j+1)+'_TIME';
                                                                                                              $scope.runners[i].TIMES[j] = eval(timeName).substring(0,8);
                                                                                                             var b = $scope.runners[i].TIMES[j];
                                                                                                             var a = b.split(':');
                                                                                                             seconds = (+a[0])*60*60+(+a[1])*60+(+a[2]);
                                                                                                              $scope.runners[i].TIMES1[j] = seconds;
                                                                                                             //$scope.ostatniWynik.push({id: (j+1), id1: k, name:seconds});
                                                                                                          }
                                                                                                       }
                                                                                             }
                                                                                      }

                                                                                      for(var i=0; i<($scope.runners.length); i++)
                                                                                       {
                                                                                       if($scope.runners[i].KLUB != undefined){
                                                                                     if($scope.druzyny.indexOf($scope.runners[i].KLUB)!= -1){
                                                                                     var index = $scope.druzyny.indexOf($scope.runners[i].KLUB);
                                                                                    // console.log("index="+index+" klub="+$scope.runners[i].KLUB+"i="+i+"druzy")
                                                                                      }
                                                                                       else {
                                                                                      //  console.log("nie ma"+i+" "+$scope.runners[i].KLUB);
                                                                                        $scope.druzyny.push($scope.runners[i].KLUB);
                                                                                         $scope.runnersDruz[i] =  $scope.runners[i];

                                                                                        }
                                                                                     }}
                                                                                   //  console.log($scope.runnersDruz);
                                                                                  }
                                                             })
                                                          .error(function(data,status,headers,config){
                                                          $scope.retInfo = 'Błąd!'+ data;
                                                        //  console.log('Błąd3!'+ data);
                                                          });
                                              }
                                              }
                                              }



                                             //klasyfikacja punktowa
                                             $scope.wynikiPunktowej = function(idZawodow) {

                                             czyWypelnic = 1;
                                             if($scope.classification!=undefined && $scope.classification.type!=undefined && $scope.classification.length<3){
                                              if(idZawodow!=undefined && $scope.classification.type.name=="Klasyfikacja punktowa"){
                                             $scope.wyniki1 = [];
                                             $scope.ostatniWynik = [];
                                             $scope.ostatniWynik1 = [];
                                             $scope.tablicaCzasu = [];
                                                             $scope.runners = [];

                                                             $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.daneEtapow[idZawodow].COMPETITION_ID)
                                                                              .success(function(data){
                                                                                  $scope.runners = data;
                                                                                  if($scope.runners[1] != null)
                                                                                  {
                                                                                  $scope.timesColumn = [];
                                                                                      for(var a=0;a<$scope.runners[0].POINTS_COUNT;a++)
                                                                                      {
                                                                                          $scope.timesColumn[a] = a+1;
                                                                                             if($scope.runners[a].hasOwnProperty('NAZWISKO'))
                                                                                               {

                                                                                               for(var b=0; b<$scope.zawodnicy.length; b++){
                                                                                             if($scope.runners[a].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                                                                {
                                                                                                   $scope.runners[a].KLUB = $scope.zawodnicy[b].KLUB;
                                                                                                }
                                                                                               }
                                                                                                 }
                                                                                      }
                                                                                     for(var i=($scope.runners.length-1), k=1; i > 0, k<($scope.runners.length); i--, k++)
                                                                                      {
                                                                                          var seconds = 0;
                                                                                          if($scope.runners[i] != undefined){
                                                                                                 if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                                         ileZawodnikow++;
                                                                                                         $scope.runners[i].MIEJSCE = k;
                                                                                                         $scope.runners[i].TIMES = new Array($scope.runners[0].POINTS_COUNT);
                                                                                                         for(var j=0; j<$scope.runners[0].POINTS_COUNT; j++)
                                                                                                          {
                                                                                                              var timeName = '$scope.runners[i].POINT'+(j+1)+'_TIME';
                                                                                                              $scope.runners[i].TIMES[j] = eval(timeName).substring(0,8);
                                                                                                             var b = $scope.runners[i].TIMES[j];
                                                                                                             var a = b.split(':');
                                                                                                             seconds = (+a[0])*60*60+(+a[1])*60+(+a[2]);
                                                                                                             //console.log(seconds);
                                                                                                             $scope.ostatniWynik.push({id: (j+1), id1: k, name:seconds});
                                                                                                          }

                                                                                                       }
                                                                                                  else {
                                                                                                  k--;
                                                                                                  }
                                                                                             }

                                                                                      }

                                                                                         var x = $scope.runners[0].POINTS_COUNT;
                                                                                         $scope.runners = $filter('orderBy')($scope.runners, 'POINT'+x+'_TIME');

                                                                                $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/classification?competition_id='+$scope.daneEtapow[idZawodow].COMPETITION_ID)
                                                                              .success(function(data){
                                                                                  $scope.response1 = data;
                                                                                     $scope.listaWynikow1 = [];
                                                                                 block1: { for(var i=($scope.runners.length-1), v=0;i >= 0,v<=$scope.timesColumn.length;i--,v++){
                                                                                     var n = 1;
                                                                                     if($scope.runners[i] != undefined){
                                                                                         if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                             $scope.listaWynikow1.push($scope.runners[i].TIMES);
                                                                                             //console.log("block1: v="+v+", i="+i);
                                                                                         }
                                                                                     }
                                                                                     block2: { while (1) {
                                                                                     if(v==$scope.timesColumn.length) var pointName = 'data.LINIAX_POINT_'+n;
                                                                                     else var pointName = 'data.LINIA'+v+'_POINT_'+n;
                                                                                         $scope.classPoints.push(eval(pointName));
                                                                                         n++;
                                                                                         if (eval(pointName) != undefined) {
                                                                                         //console.log("["+v+","+(n-1)+"]="+eval(pointName));
                                                                                         $scope.wyniki1.push({id: v, id1: (n-1), name:eval(pointName)});
                                                                                         //console.log($scope.wyniki1);
                                                                                         }
                                                                                         else break block2;
                                                                                     }
                                                                                     }

                                                                                 }
                                                                                 }

                                                                                 for(var j=0;j<=$scope.listaWynikow1.length+1;j++)
                                                                                       {
                                                                                       if($scope.runners[(j)] != undefined){

                                                                                       $scope.runners[j].SUMA = [];
                                                                                     suma = 0;
                                                                                 $scope.runners[j].TIMES1 = new Array($scope.runners[0].POINTS_COUNT);
                                                                                    for(var i=0;i<$scope.timesColumn.length;i++)
                                                                                       {
                                                                                         var ob = $filter('filter')($scope.wyniki1, {id:(i+1), id1:(j+1)})[0];

                                                                                         if(ob != undefined) {
                                                                                         suma = parseInt(suma) + parseInt(ob['name']);
                                                                                         $scope.runners[(j)].TIMES1[i] = ob['name'];
                                                                                         }
                                                                                         else {
                                                                                         $scope.runners[(j)].TIMES1[i] = "-";
                                                                                         }
                                                                                       }
                                                                                       $scope.runners[(j)].SUMA = suma;
                     }
                                                                                 }
                                                                           //  console.log($scope.runners);

                                                                              })
                                                                              .error(function(data,status,headers,config){
                                                                                  $scope.retInfo = 'Błąd!'+ data;
                                                                                //  console.log('Błąd2!'+ data);
                                                                              });
                                                                                  }
                                                                         })
                                                                      .error(function(data,status,headers,config){
                                                                      $scope.retInfo = 'Błąd!'+ data;
                                                                      //console.log('Błąd3!'+ data);
                                                                      });

                                                                }
                                                                }
                                                     }


                                 $scope.Timer = null;
                                 $scope.ostatniWynikx = [];
                                 $scope.idZawodow1 = [];


                                 $scope.idiX;
                                 //wynikiOgolne
                                 $scope.wynikiOgolne = function(idKlasyfikacji) {
                                 var iter = 0;
                                 $scope.runners = [];
                                 $scope.runners1 = [];
                                 $scope.ostatniWynikx = [];
                                   if($scope.competition!=undefined && $scope.competition.type!=undefined){
                                   if($scope.competition.type.name==(cc +". Ogólne")){

                                   if(czyWypelnic==1 && idKlasyfikacji==undefined){
                                   $scope.classification.length = 0;
                                   $scope.classification = [
                                    {name:'Klasyfikacja generalna' },
                                    {name:'Klasyfikacja punktowa' },
                                    {name:'Klasyfikacja generalna drużynowa' }
                                                           ];
                                                           }
                                                           czyWypelnic = 0;

                                         if(idKlasyfikacji=="Klasyfikacja generalna"){
                                                         $scope.timesColumn.length = 0;
                                                             $scope.timesColumn[0] = "META";
                                                         $scope.ostatniWynikx1 = [];
                                                         $scope.runners2= new Array($scope.types.length-1);
                                                         var xd = 0;
                                                         for(iter=0; iter<($scope.types.length-1); iter++){
                                                         if($scope.classification!=undefined && $scope.classification.type!=undefined){
                                                                              $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.daneEtapow[iter].COMPETITION_ID)
                                                                                .success(function(data){
                                                                                   $scope.runners = data;
                                                                                     $scope.ostatniWynikx.push($scope.runners);
                                                                                   })
                                                                               .error(function(data,status,headers,config){
                                                                                $scope.retInfo = 'Błąd!'+ data;
                                                                       });
                                                                  }
                                                         }
                                                         $timeout($scope.ogolneOdbierz,1000);
                                                 }
                                          else if (idKlasyfikacji=="Klasyfikacja punktowa"){
                                             $scope.timesColumn.length = 0;
                                             $scope.idZawPunkt =0;
                                             $scope.zawodyKlasyfikacje = [];
                                             for(var i = 0; i<$scope.daneEtapow.length;i++) {
                                             $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/classification?competition_id='+$scope.daneEtapow[i].COMPETITION_ID)
                                                      .success(function(data){
                                                       $scope.response11 = data;
                                                       $scope.zawodyKlasyfikacje.push($scope.response11);
                                             })
                                              .error(function(data,status,headers,config){
                                               $scope.retInfo = 'Błąd!'+ data;
                                             });
                                          }
                                          $timeout($scope.ogolneOdbierzPunkt,1000);
                                        }
                                        else if (idKlasyfikacji=="Klasyfikacja generalna drużynowa"){
                                             $scope.timesColumn.length = 0;
                                             $scope.idZawPunkt =0;
                                             $scope.timesColumn[0] = "META";
                                             $scope.zawodyKlasyfikacje1 = [];
                                             $scope.idiX = 0;
                                             for(var i = 0; i<$scope.daneEtapow.length;i++) {

                                             $scope.idiX = i;
                                             $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/competition/classification?competition_id='+$scope.daneEtapow[i].COMPETITION_ID)
                                                      .success(function(data){
                                                       $scope.response11 = data;
                                                       $scope.zawodyKlasyfikacje1.push($scope.response11);
                                             })
                                              .error(function(data,status,headers,config){
                                               $scope.retInfo = 'Błąd!'+ data;
                                             });
                                          }
                                          $timeout($scope.ogolneOdbierzDruz,1000);
                                      }
                                  }
                     }
                     }

                     $scope.idid;
                     $scope.ogolneOdbierzPunkt = function() {
                         $scope.idid = 0;
                         $scope.wyniki1 = [];
                         $scope.ostatniWynik = [];
                         $scope.ostatniWynik1 = [];
                         $scope.tablicaCzasu = [];
                         $scope.runners = [];
                             for(var id = 0; id<$scope.zawodyKlasyfikacje.length; id++){
                              if($scope.zawodyKlasyfikacje[id].TYP=="Klasyfikacja punktowa" && $scope.daneEtapow!=undefined){
                                                             $scope.idid = id;
                                                             $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.zawodyKlasyfikacje[$scope.idid].ID)
                                                                              .success(function(data){
                                                                                  $scope.runners = data;
                                                                                  if($scope.runners[1] != null){
                                                                                  $scope.timesColumn = [];

                                                                                      for(var a=0;a<$scope.runners[0].POINTS_COUNT;a++)
                                                                                      {
                                                                                          $scope.timesColumn[a] = a+1;
                                                                                             if($scope.runners[a].hasOwnProperty('NAZWISKO'))
                                                                                               {

                                                                                               for(var b=0; b<$scope.zawodnicy.length; b++){
                                                                                             if($scope.runners[a].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                                                                {
                                                                                                   $scope.runners[a].KLUB = $scope.zawodnicy[b].KLUB;
                                                                                                }
                                                                                               }
                                                                                                 }
                                                                                      }
                                                                                     for(var i=($scope.runners.length-1), k=1; i > 0, k<($scope.runners.length); i--, k++)
                                                                                      {
                                                                                          var seconds = 0;
                                                                                          if($scope.runners[i] != undefined){
                                                                                                 if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                                         ileZawodnikow++;
                                                                                                         //console.log("1");
                                                                                                         $scope.runners[i].MIEJSCE = k;
                                                                                                         $scope.runners[i].TIMES = new Array($scope.runners[0].POINTS_COUNT);
                                                                                                         for(var j=0; j<$scope.runners[0].POINTS_COUNT; j++)
                                                                                                          {
                                                                                                              var timeName = '$scope.runners[i].POINT'+(j+1)+'_TIME';
                                                                                                              $scope.runners[i].TIMES[j] = eval(timeName).substring(0,8);
                                                                                                             var b = $scope.runners[i].TIMES[j];
                                                                                                             var a = b.split(':');
                                                                                                             seconds = (+a[0])*60*60+(+a[1])*60+(+a[2]);
                                                                                                             //console.log(seconds);
                                                                                                             $scope.ostatniWynik.push({id: (j+1), id1: k, name:seconds});
                                                                                                          }

                                                                                                       }
                                                                                                  else {
                                                                                                  k--;
                                                                                                  }
                                                                                             }
                                                                                      }
                                                                                         var x = $scope.runners[0].POINTS_COUNT;
                                                                                         $scope.runners = $filter('orderBy')($scope.runners, 'POINT'+x+'_TIME');
                                                                                  $scope.response1 = $scope.zawodyKlasyfikacje[$scope.idid];
                                                                                //  console.log($scope.response1);
                                                                                     $scope.listaWynikow1 = [];
                                                                                 block1: { for(var i=($scope.runners.length-1), v=0;i >= 0,v<=$scope.timesColumn.length;i--,v++){
                                                                                     var n = 1;
                                                                                     if($scope.runners[i] != undefined){
                                                                                         if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                             $scope.listaWynikow1.push($scope.runners[i].TIMES);
                                                                                         //    console.log($scope.listaWynikow1);
                                                                                         }
                                                                                     }
                                                                                     block2: { while (1) {
                                                                                     if(v==$scope.timesColumn.length) var pointName = '$scope.response1.LINIAX_POINT_'+n;
                                                                                     else var pointName = '$scope.response1.LINIA'+v+'_POINT_'+n;
                                                                                         $scope.classPoints.push(eval(pointName));
                                                                                         n++;
                                                                                         if (eval(pointName) != undefined) {

                                                                                         $scope.wyniki1.push({id: v, id1: (n-1), name:eval(pointName)});
                                                                                         }
                                                                                         else break block2;
                                                                                     }
                                                                                     }
                                                                                 }
                                                                                 }
                                                                                 for(var j=0;j<=$scope.listaWynikow1.length+1;j++)
                                                                                       {
                                                                                       if($scope.runners[(j)] != undefined){

                                                                                       $scope.runners[j].SUMA = [];
                                                                                     suma = 0;
                                                                                 $scope.runners[j].TIMES1 = new Array($scope.runners[0].POINTS_COUNT);
                                                                                    for(var i=0;i<$scope.timesColumn.length;i++)
                                                                                       {
                                                                                         var ob = $filter('filter')($scope.wyniki1, {id:(i+1), id1:(j+1)})[0];
                                                                                         if(ob != undefined) {
                                                                                         suma = parseInt(suma) + parseInt(ob['name']);
                                                                                         //$scope.runners[(j)].TIMES1[i] = ob['name'];
                                                                                         }
                                                                                         else {
                                                                                         //$scope.runners[(j)].TIMES1[i] = "-";
                                                                                         }
                                                                                       }
                                                                                       $scope.runners[(j)].SUMA = suma;
                                                                                       $scope.runners[j].TIMES1.length=0;
                                                                                      }
                                                                                 }

                                                                           $scope.timesColumn.length = 0;
                                                         }
                                                         })
                                                         .error(function(data,status,headers,config){
                                                          $scope.retInfo = 'Błąd!'+ data;
                                                          });
                                                   }
                      }
                     }


                     $scope.idid1;

                     $scope.ogolneOdbierzDruz = function(){
                      $scope.idid1 = 0;
                          $scope.wyniki1 = [];
                          $scope.druzyny = [];
                          $scope.ostatniWynik = [];
                          $scope.ostatniWynik1 = [];
                          $scope.runnersDruz = [];
                          $scope.tablicaCzasu = [];
                          $scope.runners = [];
                          //console.log($scope.zawodyKlasyfikacje1);
                              for(var id = 0; id<$scope.zawodyKlasyfikacje1.length; id++){
                               if($scope.zawodyKlasyfikacje1[id].TYP=="Klasyfikacja generalna drużynowa" && $scope.daneEtapow!=undefined){
                                             $scope.idid1 = id;
                                        //     console.log($scope.idid1);
                                        //     console.log($scope.zawodyKlasyfikacje1[id]);
                                             $http.get('http://209785serwer.iiar.pwr.edu.pl/Rest1/rest/result/list?competition_id='+$scope.zawodyKlasyfikacje1[$scope.idid1].ID)
                                                                              .success(function(data){
                                                                                  $scope.runners = data;

                                                                                  if($scope.runners[1] != null)
                                                                                  {
                                                                                  $scope.timesColumn = [];
                                                                                      for(var a=0;a<$scope.runners[0].POINTS_COUNT;a++)
                                                                                      {
                                                                                          $scope.timesColumn[a] = a+1;
                                                                                             if($scope.runners[a].hasOwnProperty('NAZWISKO'))
                                                                                               {

                                                                                               for(var b=0; b<$scope.zawodnicy.length; b++){
                                                                                             if($scope.runners[a].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                                                                {
                                                                                                   $scope.runners[a].KLUB = $scope.zawodnicy[b].KLUB;
                                                                                                }
                                                                                               }
                                                                                             }
                                                                                      }
                                                                                         var x = $scope.runners[0].POINTS_COUNT;
                                                                                        $scope.runners = $filter('orderBy')($scope.runners, 'POINT'+x+'_TIME');
                                                                                     for(var i=0; i<($scope.runners.length); i++)
                                                                                      {
                                                                                          if($scope.runners[i] != undefined){
                                                                                                 if($scope.runners[i].hasOwnProperty('POINT1_TIME')){
                                                                                                         ileZawodnikow++;
                                                                                                         $scope.runners[i].MIEJSCE = i+1;
                                                                                                         $scope.runners[i].TIMES = new Array(1);
                                                                                                         $scope.runners[i].TIMES1 = new Array(1);

                                                                                                              var timeName = '$scope.runners[i].POINT'+($scope.timesColumn.length)+'_TIME';
                                                                                                              $scope.runners[i].TIMES[0] = eval(timeName).substring(0,8);
                                                                                                             var b = $scope.runners[i].TIMES[0];
                                                                                                             var a = b.split(':');
                                                                                                             seconds = (+a[0])*60*60+(+a[1])*60+(+a[2]);
                                                                                                              $scope.runners[i].TIMES1[0] = seconds;

                                                                                                       }
                                                                                             }
                                                                                      }

                                                                                      for(var i=0; i<($scope.runners.length); i++)
                                                                                       {
                                                                                       if($scope.runners[i].KLUB != undefined){
                                                                                     if($scope.druzyny.indexOf($scope.runners[i].KLUB)!= -1){
                                                                                     var index = $scope.druzyny.indexOf($scope.runners[i].KLUB);

                                                                                      }
                                                                                       else {
                                                                                        $scope.druzyny.push($scope.runners[i].KLUB);
                                                                                         $scope.runnersDruz[i] =  $scope.runners[i];

                                                                                        }
                                                                                     }
                                                                                     }
                                                                                   //  console.log($scope.runnersDruz);
                                                                                  }


                                                                             $scope.timesColumn.length = 1;
                                                                             $scope.timesColumn[0] = "META";


                                                             })
                                                          .error(function(data,status,headers,config){
                                                          $scope.retInfo = 'Błąd!'+ data;
                                                        //  console.log('Błąd3!'+ data);
                                                          });
                               }
                               }
                     }
                     $scope.ogolneOdbierz = function(){
                         var x = null;
                         $scope.res = new Array($scope.ostatniWynikx.length);
                       //  console.log("ogolne generalne");
                         for(var i=0; i<($scope.ostatniWynikx.length); i++){
                             x = $scope.ostatniWynikx[i][0].POINTS_COUNT;
                             $scope.ostatniWynikx[i] = $filter('orderBy')($scope.ostatniWynikx[i], 'POINT'+x+'_TIME');
                             for(var j=0; j<$scope.ostatniWynikx[i].length;j++) {
                               if($scope.ostatniWynikx[i][j] != undefined){
                                     if($scope.ostatniWynikx[i][j].hasOwnProperty('POINT1_TIME')){
                                              $scope.ostatniWynikx[i][j].TIMES = new Array(1);
                                              var timeName = '$scope.ostatniWynikx[i][j].POINT'+(x)+'_TIME';
                                              var b = eval(timeName).substring(0,8);
                                              var a = b.split(':');
                                              seconds = (+a[0])*60*60+(+a[1])*60+(+a[2]);
                                              $scope.ostatniWynikx[i][j].TIMES[0] = seconds;
                                }
                             }
                             }

                         }
                         for(var i=0; i<($scope.ostatniWynikx.length); i++){
                         $scope.ostatniWynikx[i] = $filter('orderBy')($scope.ostatniWynikx[i], 'USER_ID');
                         for(var j=0; j<$scope.ostatniWynikx[i].length;j++) {
                         if($scope.ostatniWynikx[i][j] != undefined){
                                         if($scope.ostatniWynikx[i][j].hasOwnProperty('POINT1_TIME')){
                                              if(i>0){
                                                 $scope.ostatniWynikx[i][j].TIMES[0] = $scope.ostatniWynikx[i][j].TIMES[0] + $scope.ostatniWynikx[(i-1)][j].TIMES[0];
                                              }
                                              if(i==($scope.ostatniWynikx.length-1)){
                                              var s = $scope.ostatniWynikx[i][j].TIMES[0];
                                             $scope.ostatniWynikx[i][j].TIMES[0] = msToTime(s);
                                              $scope.ostatniWynikx[i][j].MIEJSCE = i+1;
                                              }
                                               if($scope.ostatniWynikx[i][j].hasOwnProperty('NAZWISKO'))
                                              {
                                                    for(var b=0; b<$scope.zawodnicy.length; b++){
                                                     if($scope.ostatniWynikx[i][j].NAZWISKO == $scope.zawodnicy[b].NAZWISKO)
                                                           {
                                                           $scope.ostatniWynikx[i][j].KLUB = $scope.zawodnicy[b].KLUB;
                                                           }
                                                         }
                                                    }
                                              }
                                         }
                                 }
                         }
                         $scope.ostatniWynikx[($scope.ostatniWynikx.length-1)] = $filter('orderBy')($scope.ostatniWynikx[($scope.ostatniWynikx.length-1)], 'TIMES');
                         $scope.runners = $scope.ostatniWynikx[($scope.ostatniWynikx.length-1)];
                         $scope.ostatniWynikx = [];
                     }





                     function msToTime(duration) {
                         var  seconds = parseInt((duration)%60)
                             , minutes = parseInt((duration/(60))%60)
                             , hours = parseInt((duration/(60*60))%24);

                         hours = (hours < 10) ? "0" + hours : hours;
                         minutes = (minutes < 10) ? "0" + minutes : minutes;
                         seconds = (seconds < 10) ? "0" + seconds : seconds;

                         return hours + ":" + minutes + ":" + seconds;

                     }


                    

                    $scope.showGuestRunnersList = function(){
                        sessionStorage.setItem('compID', id);
                        window.location = '/Multi/guestRunnerList.html';
                    }
                    $scope.showStage = function(){
                                 sessionStorage.setItem('compID1', id);
                                window.location = '/Multi/guestStages.html';
                                 }
           
    }])


})();