'use strict';

BioASQ.UserCtrl = function($routeParams, $scope, Activity, User, modalFactory) {
    $scope.currentCtrl = 'UserCtrl';

    $scope.$watch('section', function () {
        switch ($scope.section) {
        case 'activities':
            $scope.activities = Activity.query({}, { id: $routeParams.creator });
            break;
        case 'followings':
            $scope.activities = Activity.following({}, { id: $routeParams.creator });
            break;
        case 'followers':
            $scope.activities = Activity.followers({}, { id: $routeParams.creator });
            break;
        }
    });

    var userID = $routeParams.creator;
    $scope.user = User.get({ id: userID });
    $scope.$watch('followings', function () {
        $scope.follows = ($scope.followings.indexOf(userID) > -1);
    });

    $scope.follow = function () {
        User.follow({ id: $routeParams.creator }, { about: $scope.me.id }, function () {
            $scope.follows = !$scope.follows;
        });
    };

    // modal dialog
    modalFactory.setCacheData({
        title: '',
        message: ''
    });
    $scope.openDialog = function(data) {
        modalFactory.openDialog(modalFactory.options('templates/partials/modal_comment.html', 'DialogCtrl', data), function() {
            // update table if open
            if ($scope.radioModel == 'comments') {
                $scope.showComments(userID); // hide
                $scope.showComments(userID); // show
            }
        });
    };
};

BioASQ.controller('UserCtrl', BioASQ.UserCtrl);
