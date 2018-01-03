const axios = require('axios');

const getExchangeRate = (from, to) => {
    try {
        return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => { return response.data.rates[to];});
    } catch (error) {
        throw new Error(`Unable to get the exchange rates for ${from} and ${to}.`);    
    }
};

// using aysnc & await together and converting this function 
const getExchangeRateAsync = async (from, to) => {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];    
        if(rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`Unable to get the exchange rates for ${from} and ${to}.`);            
    }
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    })
};

// using aysnc and await together and converting this function 
const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
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
    console.log(err.message);
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