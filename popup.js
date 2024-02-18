document.addEventListener("DOMContentLoaded", async () => {

    const exchangeRateData = await fetchExchangeRateFromApi();
    const {currency, exchangeRate, date} = exchangeRateData;

    const exchangeRateElement = document.getElementsByClassName("exc-rate")[0];

    let exchangeRateParagraph = `
        <ul>
            <li><b>waluta:</b> ${currency}</li>
            <li><b>kurs:</b> ${exchangeRate}</li>
            <li><b>data:</b> ${date}</li>
        </ul>
    `;

    exchangeRateElement.innerHTML = exchangeRateParagraph;
})

const fetchExchangeRateFromApi = async () => {
    const url = "https://api.nbp.pl/api/exchangerates/rates/A/USD?format=json"

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {code, currency, rates, table} = data;
        console.log(rates[0].mid);
        //return rates[0].mid;
        return {
            currency: code,
            exchangeRate: rates[0].mid,
            date: rates[0].effectiveDate
        }
    })
    .catch(e => {
        console.error(e);
    })

}