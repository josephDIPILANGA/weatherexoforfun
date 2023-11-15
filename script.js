
const apiKey = '9135c23ba04b29a69165b995b96af2a4';
const error = ''; 



const getLocation = async () => {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                reject(error);
            }
            );
        });
        
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&limit=7`;

        console.log(latitude, longitude);

        fetch(url)
        .then(response => {
          if (!response.ok) {
            console.error('La requête a échoué');
          }
          return response.json(); // Renvoie les données au format JSON
        })
        .then(data => {
          console.log('Données reçues :', data.list);

          const contentFetch = `<li class="the-list">
                                        <div class="info-day">
                                            <article class="forecast">
                                                <article class="day-forecast">
                                                <img class="image_card" src="/img/brume.jpg" alt="" />
                                                <img id="weather-icon" class="icone-card" src="" />
                                                <h2 class="date-card">date</h2>
                                                <p class="temperaturemin-card">temperature</p>
                                                <p class="wind-max-card">weather description</p>
                                                <p class="description-card">description</p>
                                                </article>
                                            </article>
                                        </div>
                                    </li>`

           const contentTable = document.getElementsByClassName('list-weather');

            data.list.forEach((dataItem) => {

            const element = document.createElement('div');

            element.innerHTML = contentFetch;

            // // const weatherIconUrl = `http://openweathermap.org/img/wn/${dataItem.weather.icon}.png`; // Exemple

            // element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
            element.querySelector('.date-card').textContent = dataItem.dt_txt;
            element.querySelector('.temperaturemin-card').textContent = dataItem.main.temp_min;
            element.querySelector('.wind-max-card').textContent = dataItem.wind.speed;
            element.querySelector('.description-card').textContent = dataItem.weather[0].description;
            element.querySelector('.icone-card').textContent = dataItem.weather[0].description;
            // image_card
            if(dataItem.weather[0].icon === '10d'){
              element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
              element.querySelector('.image_card').src = `/img/pluiee.png`;
            } else if(dataItem.weather[0].icon === '10n'){
              element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
              element.querySelector('.image_card').src = `/img/pluienuit.jpg`;
            } else if(dataItem.weather[0].icon === '03n'){
              element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
              element.querySelector('.image_card').src = `/img/cloud.jpg`;
            } else if(dataItem.weather[0].icon === '04n'){
              element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
              element.querySelector('.image_card').src = `/img/suncloud.jpg`;
            } else if(dataItem.weather[0].icon === '04d'){
              element.querySelector('.icone-card').src = `http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png`;
              element.querySelector('.image_card').src = `/img/suncloud.jpg`;
            }

            // element.querySelector('p.weather-description').textContent = dataItem.weatherDescription;
            
            for (let i = 0; i < contentTable.length; i++) {
                contentTable[i].appendChild(element.cloneNode(true));
              }

          })

          // Vous pouvez faire ce que vous voulez avec les données ici
        })
        .catch(error => {
          console.error('Une erreur s\'est produite :', error);
        });
    }

getLocation()