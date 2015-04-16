four51.app.factory('Nav', function() {
<<<<<<< HEAD
    var _status = { "visible" : false};

    var _toggle = function() {
        _status.visible = !_status.visible;
    };
	/*add set*/
    var _set = function(onOff) {
        _status.visible = onOff;
    };

    return {
        status: _status,
        toggle: _toggle,
		/*add set*/
        set: _set
=======
    var _status = { "visible" : true};

    var _toggle = function() {
        _status.visible = !_status.visible;
    }

    return {
        status: _status,
        toggle: _toggle
>>>>>>> upstream/master
    };
});