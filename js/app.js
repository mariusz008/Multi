(function(){

    var app = angular.module('justRaceApp', ['ngRoute', 'ngMessages','ng-sortable', 'justRaceControllers']); 

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/runnerInfo', {    
              //controller: 'runnerController',
              templateUrl: 'views/runnerInfo.html',   
              label: 'JustRace - Strona zawodnika'   
            })
            .when('/home/competitions', {
              controller: 'competitionsController',
              templateUrl: 'views/competitions.html',   
              label: 'JustRace - Lista zawodów'   
            })
            .when('/home/competition', {
              controller: 'competitionController',
              templateUrl: 'views/competition.html',   
              label: 'JustRace - Lista zawodów'   
            })
            .when('/home/myCompetition', {
              controller: 'myCompetitionController',
              templateUrl: 'views/myCompetition.html',   
              label: 'JustRace - Lista zawodów'   
            })
            .when('/home/runnerCompetition', {
              controller: 'runnerCompetitionController',
              templateUrl: 'views/runnerCompetition.html',   
              label: 'JustRace - Lista zawodów'   
            })
            .when('/home/profile', {
              controller: 'profileController',
              templateUrl: 'views/profile.html',   
              label: 'JustRace - Profil użytkownika'   
            })
            .when('/home/editProfile', {
              controller: 'editProfileController',
              templateUrl: 'views/editProfile.html',   
              label: 'JustRace - Edycja profilu użytkownika'   
            })
            .when('/home/addCompetition', {
              controller: 'addCompetitionController',
              templateUrl: 'views/addCompetition.html',   
              label: 'JustRace - Dodaj zawody'   
            })
            .when('/home/myCompetitions', {
              controller: 'myCompetitionsController',
              templateUrl: 'views/myCompetitions.html',   
              label: 'JustRace - Lista Twoich zawodów'   
            })
            .when('/home/runnerCompetitions', {
              controller: 'runnerCompetitionsController',
              templateUrl: 'views/runnerCompetitions.html',   
              label: 'JustRace - Lista Twoich zawodów'   
            })
             .when('/home/myCompetition/runnersList', {
              controller: 'runnersListController',
              templateUrl: 'views/runnersList.html',   
              label: 'JustRace - Lista Twoich zawodów'   
            })
            .when('/home/myCompetition/edit', {
              controller: 'editCompetitionController',
              templateUrl: 'views/editCompetition.html',   
              label: 'JustRace - Edycja zawodów'   
            })
            .when('/home/main', {
              controller: 'mainController',
              templateUrl: 'views/main.html',   
              label: 'JustRace - Edycja zawodów'   
            })
            .when('/home/competition/compRunnersList', {
              controller: 'compRunnersListController',
              templateUrl: 'views/compRunnerList.html',   
              label: 'JustRace - Edycja zawodów'   
            })
            .when('/home/competition/results', {
              controller: 'resultListController',
              templateUrl: 'views/resultList.html',   
              label: 'JustRace - Wyniki'   
            })
            .when('/home/myCompetition/results', {
              controller: 'myResultListController',
              templateUrl: 'views/myResultList.html',   
              label: 'JustRace - Wyniki'   
            })
            .when('/home/aboutUs', {
              templateUrl: 'views/aboutUs.html',   
              label: 'O nas'   
            })
            .when('/home/contact', {
              templateUrl: 'views/contact.html',   
              label: 'Kontakt'   
            })
            .when('/home/application', {
              templateUrl: 'views/application.html',   
              label: 'Aplikacja'   
            })
            .when('/home/how', {
              templateUrl: 'views/how.html',   
              label: 'Jak to działa'   
            })
            .when('/home.html', {
              redirectTo: '/home/competitions'   
            })
           /* .otherwise({
              redirectTo:'/home/main'
            })*/
           
        ;

        $locationProvider
            .html5Mode(true);

    }]);

})();