let num = 12;
let bigN = 1234567890123456789012345678901234567890n;
let str = "Hellow";
let bool = true;
let nullV = null;
let undef;
let objectV = {key: "value"};
let symbol = Symbol('symbol');
let funcV = function() {};

alert(
    `num is ${typeof num}\n
    bigN is ${typeof bigN}\n
    str is ${typeof str}\n
    bool is ${typeof bool}\n
    nullV is null\n
    undef is ${typeof undef}\n
    objectV is ${typeof objectV}\n
    symbol is ${typeof symbol}\n
    funcV is ${typeof funcV}\n
    `
)
