'use strict';

var controllers = angular.module('bioasq.controllers');

controllers.controller('HomeCtrl', function($scope, Activity, modalFactory) {
    $scope.currentCtrl = 'HomeCtrl';
    $scope.$watch('me.id', function () {
        $scope.activities = Activity.home({ id: $scope.me.id }, function () {
            $scope.activitiesFetched = true;
        });
    });
});
