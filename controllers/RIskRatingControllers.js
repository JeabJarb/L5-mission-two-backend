function calculateRiskRating(claimHistory) {
    if (typeof claimHistory !== 'string' || !claimHistory.trim()) {
        return { error: "there is an error" };
    }

    const keywords = ['collide', 'crash', 'scratch', 'bump', 'smash'];
    let keywordCount = 0;

    const lowerCaseHistory = claimHistory.toLowerCase();

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'g'); // \\b` - boundary, \\w* - allows plurals
        const matches = lowerCaseHistory.match(regex);
        if (matches) {
            keywordCount += matches.length;
        }
    });

    let risk_rating;
    if (keywordCount === 0) {
        risk_rating = 1;
    } else if (keywordCount === 1) {
        risk_rating = 2;
    } else if (keywordCount === 2) {
        risk_rating = 3;
    } else if (keywordCount === 3) {
        risk_rating = 4;
    } else {
        risk_rating = 5;
    }

    return { risk_rating };
}

// Controller to handle API requests
const riskRatingController = (req, res) => {
    const { claimHistory } = req.body;  
    const result = calculateRiskRating(claimHistory);  // Call the risk rating function

    if (result.error) {
        return res.status(400).json(result);  // Respond with an error if input is invalid
    }

    res.status(200).json(result);  // Respond with the calculated risk rating
};

// Export both the controller and the calculation function
module.exports = { 
    calculateRiskRating, 
    riskRatingController 
};