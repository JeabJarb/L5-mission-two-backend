const quote = require("../controllers/quoteControllers");

describe("getQuote", () => {
  test("Returns an error if the car value is missing or not a valid number", () => {
    const mockCarValue1 = -10000;
    const mockCarValue2 = undefined;
    const mockCarValue3 = "invalid";
    const CAR_VALUE_ERROR = { error: "there is an error" };

    expect(quote.getChecklist(mockCarValue1)).toEqual(CAR_VALUE_ERROR);
    expect(quote.getChecklist(mockCarValue2)).toEqual(CAR_VALUE_ERROR);
    expect(quote.getChecklist(mockCarValue3)).toEqual(CAR_VALUE_ERROR);
  });

  test("Returns an error if the risk rating is missing, out of range, or not a valid number", () => {
    const mockRiskValue1 = -1;
    const mockRiskValue2 = undefined;
    const mockRiskValue3 = "invalid";
    const RISK_VALUE_ERROR = { error: "there is an error" };

    expect(quote.getChecklist(mockRiskValue1)).toEqual(RISK_VALUE_ERROR);
    expect(quote.getChecklist(mockRiskValue2)).toEqual(RISK_VALUE_ERROR);
    expect(quote.getChecklist(mockRiskValue3)).toEqual(RISK_VALUE_ERROR);
  });
  test("Test the lowest and highest risk rating values", () => {
    const mockCarRiskRating1 = 5;
    const mockCarRiskRating2 = 1;

    expect(quote.getRiskDescription(mockCarRiskRating1)).toBe("Extremely High Risk");
    expect(quote.getRiskDescription(mockCarRiskRating2)).toBe("Low Risk");
  });
  test("Calculates the yearly and monthly premium based on the car value and risk rating", () => {
    const carValue = 24000;
    const riskRating = 3;
    const BY_YEAR = 100;
    const BY_MONTH = 12;
    const YEARLY_PREMIUM = parseFloat(((carValue * riskRating) / BY_YEAR).toFixed(2));
    const MONTHLY_PREMIUM = parseFloat((YEARLY_PREMIUM / BY_MONTH).toFixed(2));
  
    expect(quote.getYearlyPremium(carValue, riskRating)).toBe(YEARLY_PREMIUM);
    expect(quote.getMonthlyPremium(YEARLY_PREMIUM)).toBe(MONTHLY_PREMIUM);
  });
});
