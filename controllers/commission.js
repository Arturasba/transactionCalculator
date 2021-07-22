const rates = require("../helpers/constants");
const axios = require("axios");

const convertRate = async (currency, value, date) => {
  const dateGiven = new Date(date);
  const dateNow = new Date();
  if (dateGiven > dateNow) {
    throw "Given date is incorrect";
  }
  let convertedamount;
  await axios
    .get("https://api.exchangerate.host/" + date)
    .then((res) => {
      convertedamount = value / res.data.rates[currency];
    })
    .catch((e) => console.log("Something went wrong"));

  return convertedamount;
};

exports.calculateCommission = async (req) => {
  // amount before currency conversions
  let rawamount = req.body.amount;
  // check if received amount of money is in eur
  if (req.body.currency !== "EUR") {
    await convertRate(req.body.currency, rawamount, req.body.date)
      .then((convertedamount) => {
        rawamount = convertedamount;
      })
      .catch((e) => console.log(e));
  }

  let amount;
  if (rates.rates.clientsRates[req.body.client_id] == undefined) {
    amount =
      rawamount * rates.rates.defaultRate > 0.05
        ? rawamount * rates.rates.defaultRate
        : 0.05;
  } else {
    clientSpecificRate = rates.rates.clientsRates[req.body.client_id];
    amount =
      clientSpecificRate.type === "amount"
        ? clientSpecificRate.rate
        : rawamount * clientSpecificRate.rate;
  }

  let clientExists = false;
  let clientTransactions = [];
  clientTransactions.map((client) => {
    if (client.id == req.body.client_id) {
      if (
        client.year < new Date().getFullYear() ||
        client.month < new Date().getMonth()
      ) {
        client.year = new Date().getFullYear();
        client.month = new Date().getMonth();
        client.amount = 0;
      }
      if (client.amount > 1000) {
        amount = 0.03;
      }
      client.amount += parseInt(rawamount);
      clientExists = true;
    }
  });
  if (!clientExists) {
    clientTransactions.push({
      id: req.body.client_id,
      amount: parseInt(rawamount),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
  }

  return {
    amount: (Math.round(amount * 100) / 100).toFixed(2),
    currency: "EUR",
  };
};
