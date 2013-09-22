
exports.shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
    	current = Math.floor(Math.random() * (top + 1));
    	tmp = array[current];
    	array[current] = array[top];
    	array[top] = tmp;
    }

    return array;
};

/**
 * Returns a random float between `low` and `high`, high exclusive, or
 * between 0 and `low` if no `high` was passed.
 * @method randFloat
 * @return {float}
 */
exports.randFloat = function (low, high) {
	if (high == null) {
		high = low;
		low = 0;
	}
	return low + ((high - low) * Math.random());
}

/**
 * Returns a random int between `low` and `high`, high exclusive, or
 * between 0 and `low` if no `high` was passed.
 * @method randInt
 * @return {int}
 */
exports.randInt = function (low, high) {
	return exports.randFloat(low, high) | 0;
}

/**
 * Given an array, returns a random element from the array.
 * @method choice
 * @param {Array} arr
 * @returns random element
 */
exports.choice = function (arr) {
	return arr[arr.length * Math.random() | 0];
}

