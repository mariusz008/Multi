(function(){

    var app = angular.module('MultiJustRaceApp', ['ngRoute', 'ngMessages','ng-sortable', 'MultiJustRaceControllers']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/runnerInfo', {    
              //controller: 'runnerController',
              templateUrl: 'views/runnerInfo.html',   
              label: 'MultiJustRace - Strona zawodnika'
            })
            .when('/Multi/home/competitions', {
              controller: 'competitionsController',
              templateUrl: 'views/competitions.html',   
              label: 'MultiJustRace - Lista zawodów'
            })
            .when('/Multi/home/competition', {
              controller: 'competitionController',
              templateUrl: 'views/competition.html',   
              label: 'MultiJustRace - Lista zawodów'
            })
            .when('/Multi/home/myCompetition', {
              controller: 'myCompetitionController',
              templateUrl: 'views/myCompetition.html',   
              label: 'MultiJustRace - Lista zawodów'
            })

            .when('/Multi/home/runnerCompetition', {
              controller: 'runnerCompetitionController',
              templateUrl: 'views/runnerCompetition.html',   
              label: 'MultiJustRace - Lista zawodów'
            })
            .when('/Multi/home/profile', {
              controller: 'profileController',
              templateUrl: 'views/profile.html',   
              label: 'MultiJustRace - Profil użytkownika'
            })
            .when('/Multi/home/editProfile', {
              controller: 'editProfileController',
              templateUrl: 'views/editProfile.html',   
              label: 'MultiJustRace - Edycja profilu użytkownika'
            })
            .when('/Multi/home/addCompetition', {
              controller: 'addCompetitionController',
              templateUrl: 'views/addCompetition.html',   
              label: 'MultiJustRace - Dodaj zawody'
            })
            .when('/Multi/home/addMultiCompetition', {
             controller: 'addMultiCompetitionController',
              templateUrl: 'views/addMultiCompetition.html',
              label: 'MultiJustRace - Dodaj zawody'
              })
            .when('/Multi/home/myCompetitions', {
              controller: 'myCompetitionsController',
              templateUrl: 'views/myCompetitions.html',   
              label: 'MultiJustRace - Lista Twoich zawodów'
            })
                        .when('/Multi/home/myCompetitions/myStages', {
                         controller: 'showStagesController',
                         templateUrl: 'views/myCompetitions.html',
                         label: 'MultiJustRace - Lista etapów'
                         })
            .when('/Multi/home/runnerCompetitions', {
              controller: 'runnerCompetitionsController',
              templateUrl: 'views/runnerCompetitions.html',   
              label: 'MultiJustRace - Lista Twoich zawodów'
            })
             .when('/Multi/home/myCompetition/runnersList', {
              controller: 'runnersListController',
              templateUrl: 'views/runnersList.html',   
              label: 'MultiJustRace - Lista Twoich zawodów'
            })
            .when('/Multi/home/myCompetition/edit', {
              controller: 'editCompetitionController',
              templateUrl: 'views/editCompetition.html',   
              label: 'MultiJustRace - Edycja zawodów'
            })
            .when('/Multi/home/myCompetition/stage', {
                          controller: 'makeStageController',
                          templateUrl: 'views/makeStage.html',
                          label: 'MultiJustRace - Definiowanie etapów'
                        })
            .when('/Multi/home/main', {
              controller: 'mainController',
              templateUrl: 'views/main.html',   
              label: 'MultiJustRace - Edycja zawodów'
            })
            .when('/Multi/home/competition/compRunnersList', {
              controller: 'compRunnersListController',
              templateUrl: 'views/compRunnerList.html',   
              label: 'MultiJustRace - Edycja zawodów'
            })
            .when('/Multi/home/competition/results', {
              controller: 'resultListController',
              templateUrl: 'views/resultList.html',   
              label: 'MultiJustRace - Wyniki'
            })
            .when('/Multi/home/myCompetition/results', {
              controller: 'myResultListController',
              templateUrl: 'views/myResultList.html',   
              label: 'MultiJustRace - Wyniki'
            })
            .when('/Multi/home/aboutUs', {
              templateUrl: 'views/aboutUs.html',   
              label: 'O nas'   
            })
            .when('/Multi/home/contact', {
              templateUrl: 'views/contact.html',   
              label: 'Kontakt'   
            })
            .when('/Multi/home/application', {
              templateUrl: 'views/application.html',   
              label: 'Aplikacja'   
            })
            .when('/Multi/home/how', {
              templateUrl: 'views/how.html',   
              label: 'Jak to działa'   
            })
            .when('/Multi/home.html', {
              redirectTo: '/Multi/home/competitions'
            })
           /* .otherwise({
              redirectTo:'/Multi/home/main'
            })*/
           
        ;

        $locationProvider
            .html5Mode(true);

    }]);

})();