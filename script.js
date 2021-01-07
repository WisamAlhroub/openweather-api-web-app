const url = "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7"
    + "&appid=cad86314552b94deb5b82fa8e5e1e33e";

const showWeather = () => {
    let weatherTable = document.getElementById("weather-info");
    let latitude, longitude;

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            let dataSite = url + `&lat=${latitude}&lon=${longitude}`;
            fetch(dataSite)
                .then(response => {
                        response = response.json();
                        console.log(response);
                        return response;
                    }
                ).then(json => {
                    let list = json['list'];
                    console.log(list);

                    let i = 1;
                    let temp =
                    `<h3>City: ${json['city']['name']}</h3>
                    <h3>Country: ${json['city']['country']}</h3>
                    <table style="width:100%">
                        <tr>
                            <th>Day</th>
                            <th>Temperature</th>
                            <th>Description</th>
                            <th>Humidity</th>
                            <th>Wind Details</th>
                        </tr>`;

                    list.forEach(element => {
                        temp +=
                            `<tr>
                                <td>${i}</td>
                                <td>
                                    <img src="http://openweathermap.org/img/w/${element['weather'][0]['icon']}.png">
                                    <ul>
                                        <li>Day: to humans: ${element['feels_like']['day']}°, ${element['temp']['day']}°</li>
                                        <li>Eve: to humans: ${element['feels_like']['eve']}°, ${element['temp']['eve']}°</li>
                                        <li>Min: ${element['temp']['min']}°</li>
                                        <li>Max: ${element['temp']['max']}°</li>
                                        <li>Morning: to humans: ${element['feels_like']['morn']}°, ${element['temp']['morn']}°</li>
                                        <li>Night: to humans: ${element['feels_like']['night']}°, ${element['temp']['night']}°</li>
                                    </ul>
                                </td>
                                <td>${element['weather'][0]['main']}, ${element['weather'][0]['description']}</td>
                                <td>${element['humidity']}</td>
                                <td>
                                    <ul>
                                        <li>Speed: ${element['speed']}m/s</li>
                                        <li>Gust: ${element['gust']}m/s</li>
                                        <li>Direction: ${element['deg']}°</li>
                                    </ul>
                                </td>
                            </tr>`;
                        i++;
                    });
                    temp += `</table>`;
                    weatherTable.innerHTML = temp;
                }
                );
        });
    }
}

