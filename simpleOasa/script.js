document.addEventListener('DOMContentLoaded', () => {
    const timetableDiv = document.getElementById('timetable');

    const targetUrl = encodeURIComponent('https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=1076&keyOrigin=evoxEpsilon');

    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
        .then(response => response.json())
        .then(data => {
            const times = data.go.map(item => formatTime(item.sde_start1));
            displayTimes(times);
        })
        .catch(error => console.error('Error fetching data:', error));

    function formatTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toTimeString().slice(0, 5);
    }

    function displayTimes(times) {
        let htmlContent = '';
        let count = 0;

        times.forEach(time => {
            if (count > 0 && count % 4 === 0) {
                htmlContent += '<br>';
            }
            htmlContent += `${time}&emsp;`;
            count++;
        });

        timetableDiv.innerHTML = htmlContent;
    }
});
