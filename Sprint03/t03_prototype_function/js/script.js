String.prototype.removeDuplicates = function () {
    return this.replace(/\s+/, " ").trim().split(" ")
        .filter(function (value, index, array) {
            return index == array.indexOf(value);
        }).join(" ");
}
