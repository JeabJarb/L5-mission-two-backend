const DriverRisk = require("../controllers/riskRatingControllers");

describe('Risk Rating Calculations', () => {
    test('returns a risk rating of 4 for valid input with multiple keywords', () => {
        const result = DriverRisk.calculateRiskRating("My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.");
        expect(result.risk_rating).toBe(4);
    });

    test('returns a risk rating of 3 for valid input with for same keyword repeated', () => {
        const result = DriverRisk.calculateRiskRating("There was a crash and then another crash");
        expect(result.risk_rating).toBe(3);
    });

    test('returns a risk rating of 2 for valid input with one keyword', () => {
        const result = DriverRisk.calculateRiskRating("I had a minor bump in the parking lot.");
        expect(result.risk_rating).toBe(2);
    });

    test('returns a risk rating of 1 for valid input with no keywords', () => {
        const result = DriverRisk.calculateRiskRating("I have not had any accidents or claims in the last three years.");
        expect(result.risk_rating).toBe(1);
    });

    test('returns a risk rating of 5 for input with the maximum number of keywords', () => {
        const result = DriverRisk.calculateRiskRating("I firstly had a crash then a scratch, bump, smash, collide, crash");
        expect(result.risk_rating).toBe(5);
    });
});

describe('Error Handling', () => {
    test('returns an error for invalid input with an empty claim history', () => {
        const result = DriverRisk.calculateRiskRating("");
        expect(result.error).toBe("there is an error");
    });

    test('returns an error for non-string input', () => {
        const result = DriverRisk.calculateRiskRating(12345);
        expect(result.error).toBe("there is an error");
    });
});

describe('Handling Variations and Special Characters', () => {
    test('returns a risk rating of 3 for input with extra letters at the end of keywords', () => {
        const result = DriverRisk.calculateRiskRating("In 2021, my car got bumped in the driveway which left scratches ");
        expect(result.risk_rating).toBe(3);
    });

});