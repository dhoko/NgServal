/**
 * StateHistory Service
 * Add basic access to an history in your app
 */
module.exports = [function() {

    var history = [];

    return {

        isEmpty: function isEmpty() {
            return !history.length;
        },

        clear: function clear() {
            return history.length = 0;
        },

        push: function push(state) {
            history.push(state);
        },

        get: function get() {
            return angular.clone(history);
        }
    };

}];