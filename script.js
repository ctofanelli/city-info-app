
async function getCityInfo() {
  const city = document.getElementById('cityInput').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';

  const weatherApiKey = '693d6811e790ef6adda489b631173cdb'; // Replace with your actual API key

  try {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== 200) {
      resultsDiv.innerHTML = 'City not found.';
      return;
    }

    const { name, sys, main, timezone } = weatherData;
    const countryCode = sys.country;
    const temp = main.temp;
    const localTime = new Date(Date.now() + timezone * 1000).toUTCString();

    const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const countryData = await countryRes.json();
    const country = countryData[0];
    const flag = country.flags.svg;
    const population = country.population.toLocaleString();
    const languages = Object.values(country.languages).join(', ');

    resultsDiv.innerHTML = `
      <h2>${name}, ${country.name.common}</h2>
      <p><strong>Local Time:</strong> ${localTime}</p>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <img src="${flag}" alt="Flag of ${country.name.common}" width="100"/>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    `;
  } catch (error) {
    resultsDiv.innerHTML = 'Error fetching data.';
    console.error(error);
  }
}
