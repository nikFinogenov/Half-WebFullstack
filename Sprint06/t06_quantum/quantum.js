const calculateTime = () => {
    const startDate = new Date(1939, 0, 1);
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const quantumYears = Math.floor(years / 7.5);
    const quantumMonths = Math.floor(months / 2.4);
    const quantumDays = days;

    return [quantumYears, quantumMonths, quantumDays];
};

module.exports = { calculateTime };
