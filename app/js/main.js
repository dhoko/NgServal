(function() {

    function trace(o, message, logLevel){
        var _debug  = window.debug || false,
            _traceLevel = window.traceLevel,
            _levelLabel;

        if(navigator.userAgent.indexOf('MSIE') >= 0) {
            return false;
        }

        logLevel = (~~logLevel) || trace.INFO;
        if (_debug && (_traceLevel & logLevel)) {
            if (message) {
                switch (logLevel) {
                case trace.ERROR:
                    _levelLabel = 'error';
                    break;
                case trace.WARN:
                    _levelLabel = 'warn';
                    break;
                default:
                    _levelLabel = 'log';
                    break;
                }

                console.group(message);
            }

            if (o instanceof Array) {
                for( text in o){
                    console[_levelLabel||'log'](o[text]);
                }
            } else {
                console[_levelLabel||'log'](o);
            }

            if (message) console.groupEnd();
        }
    }

    // static constants decl
    // errors
    trace.ERROR   = 1;
    // warnings
    trace.WARN    = 2;
    // basic logs
    trace.INFO    = 4;
    console.log('It works');
})();