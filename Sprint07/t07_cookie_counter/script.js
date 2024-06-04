async function updateCount() {
    try {
        const response = await fetch('/count');
        const data = await response.json();
        document.getElementById('count').textContent = data.count;
    } catch (error) {
        console.error('Error fetching the count:', error);
    }
}

setInterval(updateCount, 1000);

updateCount();
