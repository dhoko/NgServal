module.exports = ['$state','$rootScope', function($state, $rootScope) {

    var intel = {
        openPage: function(dest) {
            $state.transitionTo(dest)
        }
    }

    return {
        init: function() {
            angular.extend($rootScope, intel);
        }

    };

}];