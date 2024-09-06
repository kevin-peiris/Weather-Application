window.onload = () => {
    const apiKey = '1ec71617e4a84c31bba100611243108'; 

    const cards = [
        { id: 'colombo-card', city: 'Colombo' },
        { id: 'moscow-card', city: 'Moscow' },
        { id: 'paris-card', city: 'Paris' },
        { id: 'newyork-card', city: 'New York' },
        { id: 'tokyo-card', city: 'Tokyo' },
        { id: 'sydney-card', city: 'Sydney' }
    ];

    function onLoadData(cardInfo) {
        const cardElement = document.getElementById(cardInfo.id);  // Changed variable name to avoid conflict

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cardInfo.city}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.current.temp_c;
                const condition = data.current.condition.text;
                const icon = data.current.condition.icon;
                const date = new Date(data.location.localtime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                const time = new Date(data.location.localtime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'});

                cardElement.innerHTML = `
                <div class="card-body pt-2">
                    <div class="weather-icon">
                        <img src="https:${icon}" alt="${condition}" class="img-fluid" style="width: 150px; height: 150px;">
                    </div>
                    <p class="text-dark">${condition}</p>
                    <h2 class="text-dark fw-bolder">${temp}°C</h2>
                    <h3 class="text-dark fs-4">${date}</h3>
                    <h3 class="text-dark fs-4">${time}</h3>
                </div>
            `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                cardElement.innerHTML = `<p class="text-dark">Failed to load weather data.</p>`;
            });
    }

    cards.forEach(card => {
        onLoadData(card);
    });
};


document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('search-input').value;
    if (city) {
        navigateToWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});


function navigateToWeather(city) {
    window.location.href = `city/index.html?city=${encodeURIComponent(city)}`;
}