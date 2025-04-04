exports.bmwRecommendation = (req, res) => {
  const { queryResult } = req.body;
  const budget = queryResult.parameters.budget;
  const vehicleType = queryResult.parameters.vehicleType;
  const ownership = queryResult.parameters.ownership;

  let model = "BMW 3 Series";
  if (vehicleType === "SUV") {
    if (budget === "Under $45K") model = "BMW X1";
    else if (budget === "$45K - $70K") model = "BMW X3 M40i";
    else model = "BMW X5";
  } else if (vehicleType === "Sedan") {
    if (budget === "Under $45K") model = "BMW 2 Series";
    else if (budget === "$45K - $70K") model = "BMW 5 Series";
    else model = "BMW 7 Series";
  }

  const responseText = `Based on your preferences, we recommend the ${model}.`;

  res.json({
    fulfillmentMessages: [
      { text: { text: [responseText] } }
    ]
  });
};
