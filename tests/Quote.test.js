const quote = require("../controllers/quoteControllers");
const car = require("../db/cars");

describe("getQuote", () => {
  test("Returns an error if the car value is missing or not a valid number", () => {
    const MOCK_CAR_VALUE_1 = -10000;
    const MOCK_CAR_VALUE_2 = undefined;
    const MOCK_CAR_VALUE_3 = "invalid";
    const CAR_VALUE_ERROR = { error: "there is an error" };

    expect(quote.getChecklist(MOCK_CAR_VALUE_1)).toEqual(CAR_VALUE_ERROR);
    expect(quote.getChecklist(MOCK_CAR_VALUE_2)).toEqual(CAR_VALUE_ERROR);
    expect(quote.getChecklist(MOCK_CAR_VALUE_3)).toEqual(CAR_VALUE_ERROR);
  });

  test("Returns an error if the risk rating is missing, out of range, or not a valid number", () => {
    const MOCK_RISK_VALUE_1 = -10000;
    const MOCK_RISK_VALUE_2 = undefined;
    const MOCK_RISK_VALUE_3 = "invalid";
    const RISK_VALUE_ERROR = { error: "there is an error" };

    expect(quote.getChecklist(MOCK_RISK_VALUE_1)).toEqual(RISK_VALUE_ERROR);
    expect(quote.getChecklist(MOCK_RISK_VALUE_2)).toEqual(RISK_VALUE_ERROR);
    expect(quote.getChecklist(MOCK_RISK_VALUE_3)).toEqual(RISK_VALUE_ERROR);
  });
  test("Test the lowest and highest risk rating values", () => {
    const MOCK_CAR_1 = 5;
    const MOCK_CAR_2 = 1;

    expect(quote.getRiskDescription(MOCK_CAR_1)).toBe("Extremely High Risk");
    expect(quote.getRiskDescription(MOCK_CAR_2)).toBe("Low Risk");
  });
  test("Calculates the yearly and monthly premium based on the car value and risk rating", () => {
    const CAR_VALUE = 24000;
    const RISK_RATING = 3;
    const YEARLY = 100;
    const MONTHLY = 12;
    const YEARLY_PREMIUM = parseFloat(
      ((CAR_VALUE * RISK_RATING) / YEARLY).toFixed(2)
    );
    const MONTHLY_PREMIUM = parseFloat((YEARLY_PREMIUM / MONTHLY).toFixed(2));

    expect(quote.getYearlyPremium(CAR_VALUE, RISK_RATING)).toBe(YEARLY_PREMIUM);
    expect(quote.getMonthlyPremium(YEARLY_PREMIUM)).toBe(MONTHLY_PREMIUM);
  });
});
