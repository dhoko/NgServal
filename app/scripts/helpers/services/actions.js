/**
 * Actions Service
 * It provides some actions for your application such as:
 *     - openPage(state)
 */
module.exports = ['$state', function($state) {

    var data = {
        timeouts: [],
        repeats: []
    };


    return {
        TIMEOUT_BEFORE_HOME: 60,
        /**
         * Open a state after a custom delay or 0
         * @param  {String} dest  State destination
         * @param  {Float} delay delay (s) before you open that page
         * @return {void}
         */
        openPage: function openPage(dest, delay) {

            if(delay) {
                return this.timeout(+delay, function() {
                    $state.transitionTo(dest);
                }, 'Open the page - ' + dest + ' in ' + delay + 's');
            }

            console.log("[Helpers-actions@openPage] : Open the page - " + dest);
            $state.transitionTo(dest);
        },

        /**
         * Launch a callback after a custom delay
         * @param  {Float}   delay Delay in seconds
         * @param  {Function} cb    Callback
         * @param  {String}   msg   Custom message to log
         * @return {void}
         */
        timeout: function timeout(delay, cb, msg) {
            data.timeouts.push(window.setTimeout(cb, delay * 1000));
            msg && console.log("[Helpers-actions@timeout] " + msg);
        },

        /**
         * Repeat an action after a custom Delay
         * @param  {Float}   delay Delay in seconds
         * @param  {Function} cb    Callback
         * @param  {String}   msg   Custom message to log
         * @return {void}
         */
        repeat: function repeat(delay, cb, msg) {
            data.repeats.push(window.setTimeout(cb, delay * 1000));
            msg && console.log("[Helpers-actions@repeat] " + msg);
        },

        /**
         * Clean ou intervals an timeouts
         * @param  {String} type Type of data to clean action|repeat
         * @param  {Boolean} back2Home Set to true to auto trigger a return to the home for each page
         * @return {void}
         */
        reset: function reset(type, back2Home) {

            console.log('[Helpers-actions@reset] Clear ' + type);
            if('action' === type) {
                data.timeouts.forEach(window.clearTimeout);
                data.timeouts.length = 0;

                if(back2Home) {
                    this.openPage('home', this.TIMEOUT_BEFORE_HOME);
                }

            }else{
                data.repeats.forEach(window.clearInterval);
                data.repeats.length = 0;
            }


        }
    };
}];