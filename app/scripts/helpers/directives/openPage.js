/**
 * OpenPage directive
 * Open anothe state if you click on an element with the attr openPage
 * You can set a delay if you specify a delay in seconds inside the attr openPageDelay
 */
module.exports = ['actions', function (actions) {
    return {
        restrict: "A",
        link: function(scope, el, attr) {
            el.on('click', function() {
                actions.openPage(attr.openPage, attr.openPageDelay);
            });
        }
    }
}];