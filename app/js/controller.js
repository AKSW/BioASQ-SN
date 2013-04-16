'use strict';
/**
 *
 */
BioASQ.HomeCtrl = function ($scope, $location, Questions, Me) {

    Me.login(function(){
        $scope.me = Me.data;
    });

    // get questions
    Questions.getQuestions(function (data) {
        $scope.questions = data != null ? data : "error";
    });

    // init detail
    $scope.detail = { id : "" };

    // ng-click detail
    $scope.questionDetail = function (id){
        // show
        Questions.getDetail(id, function (data) {
            if (data != null) {
                $scope.detail = {
                                    id : id,
                                    answer : data.answer,
                                    ideal : data.ideal
                                }
            }
        });
    };

    $scope.vote = function(id, dir){
        Questions.vote(id, dir, function(data){
            //...
        });
    };
};

/**
 *
 */
BioASQ.UserCtrl = function ($scope, $location, Users, Me) {
    Me.login(function(){
        $scope.me = Me.data;
    });
    // http://.../#/user/id
    var id = $location.path().substr($location.path().lastIndexOf('/') + 1);
    Users.getUser(id, function (data) {
        $scope.user = data != null ? data : "error";
    });

    $scope.showFollowing = function(){
        Users.getFollowing(id, function(data){
            $scope.data = data;
        });
    };
    // default 
    $scope.showFollowing(id);

    $scope.showComments = function(){
        Users.getComments(id, function(data){
            $scope.data = data;
        });
    };

    $scope.showFollowers = function(){
        Users.getFollowers(id, function(data){
            $scope.data = data;
        });
    };
};

/**
 *
 */
BioASQ.TimelineCtrl = function ($scope, $location, Me) {
    Me.login(function(){
        $scope.me = Me.data;
    });
};

/**
 *
 */
BioASQ.MessageCtrl = function ($scope, $location, Me) {
    Me.login(function(){
        $scope.me = Me.data;
    });
};

BioASQ.controller('HomeCtrl', BioASQ.HomeCtrl);
BioASQ.controller('UserCtrl', BioASQ.UserCtrl);
BioASQ.controller('TimelineCtrl', BioASQ.TimelineCtrl);
BioASQ.controller('MessageCtrl', BioASQ.MessageCtrl);
