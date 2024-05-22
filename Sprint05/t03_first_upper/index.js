exports.firstUpper = function(string) {
    if (string === null || typeof string !== 'string') {
        return '';
    }
    string = string.trim();
    if (string.length === 0) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
