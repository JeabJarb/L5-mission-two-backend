const car = require("../db/cars");

const cars = car[0];

const carYear = cars.year;
const carMake = cars.make;
const carModel = cars.model;
const carValue = cars.car_value;
const riskRating = cars.risk_rating;
const BY_YEAR = 100;
const BY_MONTH = 12;

const getQuoteApiHandle = (req, res) => {
  console.log(req.query);
  const yearlyPremium = getYearlyPremium(carValue, riskRating);
  const monthlyPremium = getMonthlyPremium(yearlyPremium);
  const result = { yearlyPremium, monthlyPremium };
  res.status(200).json(result);
};

const getChecklist = (carValue, riskRate) => {
  if (carValue === undefined || isNaN(carValue) || carValue <= 0) {
    return { error: "there is an error" };
  }

  if (
    riskRate === undefined ||
    isNaN(riskRate) ||
    riskRate <= 0 ||
    riskRate > 5
  ) {
    return { error: "there is an error" };
  }

  return { carValue, riskRate };
};

const getRiskDescription = (riskRate) => {
  if (riskRate === 1) {
    return "Low Risk";
  } else if (riskRate === 2) {
    return "Moderate Risk";
  } else if (riskRate === 3) {
    return "High Risk";
  } else if (riskRate === 4) {
    return "Very High Risk";
  } else {
    return "Extremely High Risk";
  }
};

const getYearlyPremium = (carValue, riskRate) => {
  return parseFloat(((carValue * riskRate) / BY_YEAR).toFixed(2));
};

const getMonthlyPremium = (yearlyPremium) => {
  return parseFloat((yearlyPremium / BY_MONTH).toFixed(2));
};

console.log(
  `${carYear} ${carMake} ${carModel} is a ${getRiskDescription(
    riskRating
  )} vehicle. Yearly premium: $${getYearlyPremium(
    carValue,
    riskRating
  )} and Monthly premium: $${getMonthlyPremium(
    getYearlyPremium(carValue, riskRating)
  )}`
);

console.table(
  car.map((car) => {
    const { car_value, risk_rating } = car;
    return {
      year: car.year,
      make: car.make,
      model: car.model,
      car_value: car.car_value,
      risk_rating: car.risk_rating,
      yearly: getYearlyPremium(car_value, risk_rating),
      monthly: getMonthlyPremium(getYearlyPremium(car_value, risk_rating)),
    };
  })
);

module.exports = {
  getQuoteApiHandle,
  getChecklist,
  getRiskDescription,
  getYearlyPremium,
  getMonthlyPremium,
};
