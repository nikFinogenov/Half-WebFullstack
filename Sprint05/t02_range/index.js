exports.checkDivision = function(start = 1, end = 60) {
    for (let i = start; i <= end; i++) {
        let result = `The number ${i}`;
        let divisors = [];

        if (i % 2 === 0) divisors.push('is divisible by 2');
        if (i % 3 === 0) divisors.push('is divisible by 3');
        if (i % 10 === 0) divisors.push('is divisible by 10');

        if (divisors.length > 0) {
            result += ' ' + divisors.join(', ');
        } else {
            result += ' -';
        }

        console.log(result);
    }
}
