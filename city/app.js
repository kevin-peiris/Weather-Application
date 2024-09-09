window.onload = () => {
    // Get the city from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    const apiKey = '1ec71617e4a84c31bba100611243108';

    if (!city) {
        document.getElementById('weather-info').innerHTML = '<p class="text-dark">No city specified.</p>';
        return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14`;


    console.log('Fetching weather data from:', url);

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;
            const date = new Date(data.location.localtime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            const time = new Date(data.location.localtime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
            const feelsLike = data.current.feelslike_c;
            const wind = data.current.wind_kph;
            const pressure = data.current.pressure_in;
            const humidity = data.current.humidity;
            const gust = data.current.gust_kph;
            const city = data.location.name;
            const country = data.location.country;
            const day = new Date(data.location.localtime).toLocaleDateString('en-US', { weekday: 'long' });

            fetchCityPhotos(country); 

            //Current Weather Info
            document.getElementById('current-weather-large').innerHTML = `
                <div class="col mb-4">
                    <div class="row bg-light p-3">
                        <div class="col-12 col-md-4 mt-2 text-center">
                            <h1 class="fw-bolder display-5 text-primary">${temp}&deg;C</h1>
                            <p class="fs-5">${date}</p>
                            <h3 class="text-dark fs-4">${time}</h3>
                        </div>
                        <div class="col-12 col-md-1 d-flex justify-content-center align-items-center my-3 my-md-0">
                            <div class="vr bg-dark" style="height: 150px; width: 2px;"></div>
                        </div>
                        <div class="col-12 col-md-3 d-flex flex-column align-items-center text-center my-3 my-md-0">
                            <img src="https:${icon}" alt="${condition}" class="img-fluid"
                                style="width: 120px; height: 120px;">
                            <p class="mt-2">${condition}</p>
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <div class="fs-5">Weather</div>
                            <div class="fs-3 text-primary">${city}</div>
                            <div class="fs-5">${country}</div>
                            <div class="mt-2 fs-3">${day}</div>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="bg-light p-3">
                        <div class="row mb-2">
                            <div class="col fs-5 text-start">Feels like</div>
                            <div class="col fs-5 text-end">${feelsLike}&deg;C</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start">Wind (Kmph)</div>
                            <div class="col fs-5 text-end">${wind}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start">Pressure (Inch)</div>
                            <div class="col fs-5 text-end">${pressure}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start">Humidity</div>
                            <div class="col fs-5 text-end">${humidity}%</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start">Gust (Kmph)</div>
                            <div class="col fs-5 text-end">${gust}</div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('current-weather-medium').innerHTML = `
                <div class="col mb-4">
                    <div class="row row-cols-3 bg-light pt-2 pb-2 m-2 align-content-center">
                        <div class="col-6 d-flex flex-column align-items-center text-center my-2">
                            <h1 class="fw-bolder display-4 text-primary">${temp}&deg;C</h1>
                            <img src="https:${icon}" alt="${condition}" class="img-fluid"
                                style="width: 80px; height: 80px;">
                            <p class="mt-2">${condition}</p>
                        </div>
                        <div class="col-6 text-center my-auto">
                            <div class="fs-5">Weather</div>
                            <div class="fs-4 text-primary">${city}</div>
                            <div class="fs-5">${country}</div>
                            <div class="mt-2 fs-4">${day}</div>
                            <p class="fs-4">${date}</p>
                        </div>
                    </div>
                    <div class="bg-light p-2 m-2 mt-3">
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Feels like</div>
                            <div class="col fs-5 text-end">${feelsLike}&deg;C</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Wind (Kmph)</div>
                            <div class="col fs-5 text-end">${wind}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Pressure (Inch)</div>
                            <div class="col fs-5 text-end">${pressure}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Humidity</div>
                            <div class="col fs-5 text-end">${humidity}%</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Gust (Kmph)</div>
                            <div class="col fs-5 text-end">${gust}</div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('current-weather-small').innerHTML = `
                <div class="col mb-4">
                    <div class="row row-cols-2 bg-light pt-2 pb-2 m-2 align-content-center">
                        <div class="col-6 d-flex flex-column align-items-center text-center my-2">
                            <h1 class="fw-bolder display-4 text-primary">${temp}&deg;C</h1>
                            <img src="https:${icon}" alt="${condition}" class="img-fluid"
                                style="width: 80px; height: 80px;">
                            <p class="mt-2">${condition}</p>
                        </div>
                        <div class="col-6 text-center my-auto">
                            <div class="fs-6">Weather</div>
                            <div class="fs-5 text-primary">${city}</div>
                            <div class="fs-6">${country}</div>
                            <div class="mt-2 fs-5">${day}</div>
                            <p class="fs-5">${date}</p>
                        </div>
                    </div>
                    <div class="bg-light p-2 m-2 mt-3">
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Feels like</div>
                            <div class="col fs-5 text-end">${feelsLike}&deg;C</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Wind (Kmph)</div>
                            <div class="col fs-5 text-end">${wind}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Pressure (Inch)</div>
                            <div class="col fs-5 text-end">${pressure}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Humidity</div>
                            <div class="col fs-5 text-end">${humidity}%</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col fs-5 text-start text-nowrap">Gust (Kmph)</div>
                            <div class="col fs-5 text-end">${gust}</div>
                        </div>
                    </div>
                </div>
            `;

            // Iterate over forecast days
            const forecast = data.forecast.forecastday;
            let structure = document.getElementById('weather-forecast');

            let weatherForecast = '';

            forecast.forEach((dayForecast, index) => {
                const temp = dayForecast.day.avgtemp_c;
                const condition = dayForecast.day.condition.text;
                const icon = dayForecast.day.condition.icon;
                const date = new Date(dayForecast.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

                weatherForecast += `
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-4 mt-5">
                        <div class="bg-primary text-white p-2 text-center mb-2">
                            <div class="card-body">
                                <h4 class="card-title text-light fw-bold">${date}</h4>
                            </div>
                        </div>
                        <div class="bg-light text-white p-2 text-center mb-2 h-100">
                            <div class="card-body pt-2">
                                <div class="weather-icon">
                                    <img src="https:${icon}" alt="${condition}" class="img-fluid" style="width: 150px; height: 150px;">
                                </div>
                                <h4 class="text-dark">${condition}</h4>
                                <h2 class="text-dark fw-bolder">${temp}°C</h2>
                            </div>
                        </div>
                    </div>
                `;
            });

            structure.innerHTML = weatherForecast;
        })
};
function fetchCityPhotos(city) {
    fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=FJU1__hja_PtWxVA67jahyUZwa36Pg5Aqqs0IYqjITQ`)
        .then(res => res.json())
        .then(data => {
            const photosContainer = document.getElementById('pic-container');
            
            let photos = '';
            
            data.results.forEach(photo => {
                photos += `
                    <div class='col'>
                        <div class="card h-100">
                            <div class="ratio ratio-1x1">
                                <img src="${photo.urls.small}" class="card-img-top" alt="${photo.alt_description}" style="object-fit: cover;">
                            </div>
                            <div class="card-body p-2 text-center">
                                <p class="card-text">${photo.alt_description || 'No description'}</p>
                            </div>
                        </div>
                    </div>
                `;
            });

            photosContainer.innerHTML = photos; // Corrected this line
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });
}








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
    window.location.href = `city.html?city=${encodeURIComponent(city)}`;
}
