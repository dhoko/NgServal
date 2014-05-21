/**
 * Actions Service
 * It provides some actions for your application such as:
 *     - openPage(state)
 */
module.exports = ['$state','$rootScope', function($state, $rootScope) {

    var data = {
        timeouts: [],
        repeats: []
    };


    return {
        openPage: function openPage(dest, delay) {

            if(delay) {
                return this.timeout(+delay, function() {
                    $state.transitionTo(dest);
                }, 'Open the page - ' + dest + ' in ' + delay + 's');
            }

            console.log("[Helpers-actions@openPage] : Open the page - " + dest);
            $state.transitionTo(dest);
        },

        timeout: function timeout(delay, cb, msg) {
            data.timeouts.push(window.setTimeout(cb, delay * 1000));
            msg && console.log("[Helpers-actions@timeout] " + msg);
        },

        repeat: function repeat(delay, cb, msg) {
            data.repeats.push(window.setTimeout(cb, delay * 1000));
            msg && console.log("[Helpers-actions@repeat] " + msg);
        },

        reset: function reset(type) {

            if('action' === type) {
                data.timeouts.forEach(window.clearTimeout);
                data.timeouts.length = 0;
            }else{
                data.repeats.forEach(window.clearInterval);
                data.repeats.length = 0;
            }

            console.log('[Helpers-actions@reset] Clear ' + type);
        }

    };

}];