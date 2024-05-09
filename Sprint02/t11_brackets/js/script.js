function checkBrackets(string) {
    if (typeof string !== "string" || !string.match(/[()]/)) {
        return -1;
    }

    let open = 0;
    let close = 0;
    let result = 0;
    for (let key in string.split("")) {
        if (string[key] == '(') open++;
        else if (string[key] == ')') {
            if (open) open--;
            else close++;
        }
    }
    result = open + close

    return result;
}
