import { createChart } from "./MyChart.js";

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
            <li><b>cena kupna:</b> ${exchangeRate}</li>
            <li><b>data:</b> ${date}</li>
        </ul>
    `;

    exchangeRateElement.innerHTML = exchangeRateParagraph;

    displayChart();

}

const handleUsdBtnClick = () => {
    showPopupContent("USD");
}

const handleEurBtnClick = () => {
    showPopupContent("EUR");
}

const fetchExchangeRateFromApi = async (currency) => {
    const url = `https://api.nbp.pl/api/exchangerates/rates/C/${currency}?format=json`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {code, currency, rates, table} = data;

        return {
            currencyCode: code,
            exchangeRate: rates[0].bid,
            date: rates[0].effectiveDate
        }
    })
    .catch(e => {
        console.error(e);
    })
}

const displayChart = () => {
    const xValues = ['12.02.2023',60,70,80,90,100,110,120,130,140];
    const yValues = [7,8,8,9,9,9,10,11,14,14];

    createChart(xValues, yValues);

}

