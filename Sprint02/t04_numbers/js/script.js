function numCheck(beginRange = 1, endRange = 100) {
    for (let i = beginRange; i <= endRange; i++) {
        if (i % 2 == 0 && i % 3 == 0 && i % 10 == 0) {
            console.log(i + " is even, a multiple of 3, a multiple of 10");
        } else if (i % 2 == 0 && i % 3 == 0) {
            console.log(i + " is even, a multiple of 3");
        } else if (i % 2 == 0 && i % 10 == 0) {
            console.log(i + " is even, a multiple of 10");
        } else if (i % 3 == 0) {
            console.log(i + " is a multiple of 3");
        } else if (i % 10 == 0) {
            console.log(i + " is a multiple of 10");
        } else if (i % 2 == 0) {
            console.log(i + " is even");
        } else {
            console.log(i + " -");
        }
    }
}

let range = prompt("Enter number range with '-', example '1 - 100'");
let begin = range.split(" - ")[0];
let end = range.split(" - ")[1];
numCheck(begin, end);
