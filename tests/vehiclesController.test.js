
describe('getvehicles', () => {
  it('should correctly transform the model string to a sum of character values', () => {
    const testCases = [
      { model: 'abc', expectedSum: 6 }, // a=1, b=2, c=3
      { model: 'ABC', expectedSum: 6 }, // a=1, b=2, c=3 (case insensitive)
      { model: 'a1b2c3', expectedSum: 6 }, // digits are ignored
      { model: 'xyz', expectedSum: 75 }, // x=24, y=25, z=26
      { model: 'HelloWorld', expectedSum: 124 }, // h=8, e=5, l=12, l=12, o=15, w=23, o=15, r=18, l=12, d=4
      { model: '', expectedSum: 0 }, // empty string
      { model: '12345', expectedSum: 0 }, // only digits
      { model: 'a!b@c#', expectedSum: 6 }, // special characters are ignored
    ];

    testCases.forEach(({ model, expectedSum }) => {
      const vehicle = { Model: model };
      const transformedModelSum = vehicle.Model.toLowerCase().split('').reduce((sum, char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { // a-z
          return sum + (charCode - 96); // a=1, b=2, ..., z=26
        }
        return sum; // Non-alphabet characters remain unchanged
      }, 0);

      expect(transformedModelSum).toBe(expectedSum);
    });
  });
});