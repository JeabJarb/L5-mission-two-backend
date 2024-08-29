const carValue = require("../controllers/vehiclesControllers");

test("Get car value", () => {
  const carModel = "Camry";
  const carYear = 2020;
  expect(carValue.getvehicles(carModel, carYear)).toBe(8020);
});