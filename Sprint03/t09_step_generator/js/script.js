let previous = 1;

while (true) {
    let number = prompt(`Previous result: ${previous}. Enter a new number:`);
    if (Number(number))
        previous += Number(number);
    else
        console.error('Invalid number!');
    if (previous > 10000)
        previous = 1;
    if (number === 'stop')
        break;
}
