import { createChart } from "./MyChart.js";

let currency = "USD";
let periodOfTime = 7;

document.addEventListener("DOMContentLoaded", async () => {

    const usdBtn = document.getElementById("usd-btn");
    const eurBtn = document.getElementById("eur-btn");
    const sevenDaysBtn = document.getElementById("seven-days-btn");
    const thirtyDaysBtn = document.getElementById("thirty-days-btn");

    usdBtn.addEventListener("click", handleUsdBtnClick);
    eurBtn.addEventListener("click", handleEurBtnClick)
    sevenDaysBtn.addEventListener("click", handleSevenDaysBtnClick);
    thirtyDaysBtn.addEventListener("click", handleThirtyDaysBtnClick);

    await showPopupContent();
})

const showPopupContent = async () => {
    const exchangeRateData = await fetchExchangeRateFromApi(currency);
    const historicalExchangeRatesData = await fetchHistoricalExchangeRatesFromApi(currency, periodOfTime);
    
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

    const dates = historicalExchangeRatesData.map(item => item.date);
    const exchangeRates = historicalExchangeRatesData.map(item => item.exchangeRate);

    displayChart(dates, exchangeRates);

}

const handleUsdBtnClick = () => {
    currency = "USD";
    showPopupContent();
}

const handleEurBtnClick = () => {
    currency = "EUR";
    showPopupContent();
}

const handleSevenDaysBtnClick = () => {
    periodOfTime = 7;
    showPopupContent();
}

const handleThirtyDaysBtnClick = () => {
    periodOfTime = 30;
    showPopupContent();
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

const fetchHistoricalExchangeRatesFromApi = async(currency, numberOfDays) => {
    const url = `https://api.nbp.pl/api/exchangerates/rates/C/${currency}/last/${numberOfDays}?format=json`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {code, currency, rates, table} = data;

        const historicalExchangeRatesData = [];

        for(let i = 0; i < rates.length; i++){
            const historicalExchangeRateData = {
                currencyCode: code,
                exchangeRate: rates[i].bid,
                date: rates[i].effectiveDate
            }

            historicalExchangeRatesData.push(historicalExchangeRateData);
        }

        return historicalExchangeRatesData;
    })
}

const displayChart = (xValues, yValues) => {
    const min = Math.min(yValues);
    const max = Math.max(yValues);

    const chartContainer = document.getElementById("chart-container");
    chartContainer.innerHTML = "";
    chartContainer.innerHTML = `<canvas id="myChart" style="width:100%;max-width:700px"></canvas>`;

    createChart(xValues, yValues, min, max);
}

