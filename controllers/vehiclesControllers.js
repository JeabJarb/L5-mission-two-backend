const cars = require("../db/models");

const getvehicles = (carModel, carYear) => {
    // Transform the Model value
    const transformedModelSum = carModel.toLowerCase().split('').reduce((sum, char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { // a-z
            return sum + (charCode - 96); // a=1, b=2, ..., z=26
        }
        return sum; // Non-alphabet characters remain unchanged
    }, 0);

    const baseCarValue = transformedModelSum * 100 + carYear;
    // Log the transformed result to the terminal
    console.log(baseCarValue);

    return baseCarValue;
};

console.table(
    cars.map((car) => {
        return {
            make: car.make,
            model: car.model,
            year: car.year,
            car_value: getvehicles(car.model, car.year)
        }
    })
);

module.exports = { getvehicles, };