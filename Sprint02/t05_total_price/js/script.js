function total(addCount, addPrice, currentTotal) {
    if (currentTotal === undefined) currentTotal = 0;

    if (addCount === 0) return currentTotal;
    else currentTotal += addCount * addPrice;

    return currentTotal;
}
