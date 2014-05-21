/**
 * Actions Service
 * It provides some actions for your application such as:
 *     - openPage(state)
 */
module.exports = ['$state','$rootScope', function($state, $rootScope) {

    return {
        openPage: function(dest) {
            $state.transitionTo(dest);
        }

    };

}];