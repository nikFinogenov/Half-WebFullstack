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

    return {
        years: () => years,
        months: () => months,
        days: () => days
    };
};

module.exports = { calculateTime };
