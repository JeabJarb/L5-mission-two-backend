const pool=require("../db/db")

// ===== vehicles  ======== //
const getvehicles = (req, res) => {
  console.log(`/api/vehicles/ endpoint was hit🎯`);
  const query = `SELECT Test_Case_Number, Test_Description, Make, Model, Year, Expected_Output FROM vehicles`;

  pool.execute(query, (err, result) => {
      if (err) {
          console.log("Database error:", err);
          return res.status(500).json({ errorMessage: "An error occurred while fetching data from the database." });
      }

      if (result.length === 0) {
          return res.sendStatus(401); // e.g., no vehicles found
      }
        
       // Transform the Model value
       const transformedResults = result.map(vehicle => {
        const transformedModelSum = vehicle.Model.toLowerCase().split('').reduce((sum, char) => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 97 && charCode <= 122) { // a-z
                return sum +(charCode - 96); // a=1, b=2, ..., z=26
            }
            return sum; // Non-alphabet characters remain unchanged
        }, 0);
          const updatedYear = vehicle.Year + (transformedModelSum * 100);
        return {
            Test_Case_Number : vehicle.Test_Case_Number,
            // Make: vehicle.Model,
            Model :  `${vehicle.Model} ${vehicle.Year}`, // Combine Model and Year
            // Year: vehicle.Year,
            Expected_Output : updatedYear,
            Test_Description : vehicle.Test_Description
        };
    });

    // Log the transformed result to the terminal
    console.log("Transformed Vehicles:", transformedResults);


      return res.status(200).send(transformedResults);
  });
};

module.exports = { getvehicles };


