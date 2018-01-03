const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    })
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to).then((rate) => {
            const exchangedAmount = amount * rate;
            return `${amount}  ${from} is worth to ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
        });
    });
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;
    return `${amount}  ${from} is worth to ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
};

convertCurrency('CAD', 'USD', 100).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
}).catch((err) => {
    console.log(err);
});

getCountries('CAD').then((countries) => {
    console.log(countries);
}).catch((err) => {
    console.log(err);
});