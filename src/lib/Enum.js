import lib.Enum as Enum;

exports = function() {
	var result = Enum.apply(this, arguments);
	result.length = arguments.length;
	return result;
};