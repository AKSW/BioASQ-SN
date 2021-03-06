'use strict';

// Rewards for the last 1000 activities
angular.module('bioasq.services').factory('Rewards', function(User) {
    return {
        forUser: function(user) {
            User.query({
                id: user.id,
                action: 'activities',
                limit: 1000
            }, function(activities, header) {
                user.nOfQuestions = 0;
                user.nOfComments = 0;
                user.nOfVotes = 0;
                angular.forEach(activities, function(activity) {
                    if (activity.type === 'Comment') {
                        user.nOfComments++;
                    } else if (activity.type === 'Vote') {
                        user.nOfVotes++;
                    } else if (activity.type === 'Question') {
                        user.nOfQuestions++;
                    }
                });
                return user;
            });
        },

        forUsers: function(users) {
            var self = this;
            angular.forEach(users, function(user) {
                self.forUser(user);
            });
            return users;
        }
    };
});
