document.addEventListener("DOMContentLoaded", async () => {

    const usdBtn = document.getElementById("usd-btn");
    const eurBtn = document.getElementById("eur-btn");

    usdBtn.addEventListener("click", handleUsdBtnClick);
    eurBtn.addEventListener("click", handleEurBtnClick)

    await showPopupContent();
})

const showPopupContent = async (currency = "USD") => {
    const exchangeRateData = await fetchExchangeRateFromApi(currency);
    const {currencyCode, exchangeRate, date} = exchangeRateData;
    const exchangeRateElement = document.getElementsByClassName("exc-rate")[0];

    let exchangeRateParagraph = `
        <ul>
            <li><b>waluta:</b> ${currencyCode}</li>
            <li><b>kurs:</b> ${exchangeRate}</li>
            <li><b>data:</b> ${date}</li>
        </ul>
    `;

    exchangeRateElement.innerHTML = exchangeRateParagraph;
}

const handleUsdBtnClick = () => {
    showPopupContent("USD");
}

const handleEurBtnClick = () => {
    showPopupContent("EUR");
}

const fetchExchangeRateFromApi = async (currency) => {
    const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}?format=json`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {code, currency, rates, table} = data;

        return {
            currencyCode: code,
            exchangeRate: rates[0].mid,
            date: rates[0].effectiveDate
        }
    })
    .catch(e => {
        console.error(e);
    })

}

