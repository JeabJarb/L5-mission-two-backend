const car = require("../db/cars");

const cars = car[0];

const CAR_YEAR = cars.year;
const CAR_MAKE = cars.make;
const CAR_MODEL = cars.model;
const CAR_VALUE = cars.car_value;
const RISK_RATING = cars.risk_rating;
const YEARLY = 100;
const MONTHLY = 12;

const getQuoteApiHandle = (req, res) => {
  console.log(req.query);
  const yearlyPremium = getYearlyPremium(CAR_VALUE, RISK_RATING);
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
  return parseFloat(((carValue * riskRate) / YEARLY).toFixed(2));
};

const getMonthlyPremium = (yearlyPremium) => {
  return parseFloat((yearlyPremium / MONTHLY).toFixed(2));
};

console.log(
  `${CAR_YEAR} ${CAR_MAKE} ${CAR_MODEL} is a ${getRiskDescription(
    RISK_RATING
  )} vehicle. Yearly premium: $${getYearlyPremium(
    CAR_VALUE,
    RISK_RATING
  )} and Monthly premium: $${getMonthlyPremium(
    getYearlyPremium(CAR_VALUE, RISK_RATING)
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
