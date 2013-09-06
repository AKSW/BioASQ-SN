'use strict';

var dependencies = [
    'bioasq.filters',
    'bioasq.resources',
    'bioasq.controllers',
    'bioasq.services',
    'ngSanitize',
    'ui.bootstrap',
    'ui'
];

var BioASQ = angular.module('BioASQ', dependencies);

BioASQ.constant('pages', {
    home: { controllerName: 'HomeCtrl', description: 'activitites of people/things you follow' },
    messages: { controllerName: 'MessageCtrl', description: 'received/sent messages' },
    timeline: { controllerName: 'TimelineCtrl', description: 'all activities' },
    questions: { controllerName: 'QuestionController', description: 'all questions' }
});

BioASQ.config(['$provide', '$routeProvider', 'pages', function ($provide, $routeProvider, pages) {
    angular.forEach(pages, function (config, page) {
        $routeProvider.when('/' + page, {
            templateUrl: 'templates/' + page + '.html',
            controller: config.controllerName
        });
    });

    $routeProvider.when('/users/:creator', {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
    });

    $routeProvider.when('/authentication/:code', {
        templateUrl: 'templates/authentication.html',
        controller: 'AuthenticationCtrl'
    });

    $routeProvider.otherwise({
        templateUrl: 'templates/authentication.html',
        controller: 'AuthenticationCtrl'
    });
}]);

BioASQ.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);

BioASQ.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    // redirects to the login page in case of a 401
    $httpProvider.responseInterceptors.push(['$location', '$q', function($location, $q) {
        function success(response) {
            return response;
        }
        function error(response) {
            if(response.status === 401) {
                $location.path('authentication');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }
        return function(promise) {
            return promise.then(success, error);
        };
    }]);
}]);

BioASQ.run(function (pages, $rootScope, $routeParams, $location) {
    $rootScope.pages = pages;
    $rootScope.cache = {
        followings: []
    };
    $rootScope.me = {
        id: 'anonymous'
    };

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if($rootScope.me.id === 'anonymous' && next.controller !== 'AuthenticationCtrl'){
            $location.path('authentication');
        }
    });
});
