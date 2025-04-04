const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
  const queryResult = req.body.queryResult;
  const budget = queryResult.parameters.budget;
  const vehicleType = queryResult.parameters.vehicleType;
  const ownership = queryResult.parameters.ownership;

  let model = '';

  if (vehicleType === "SUV") {
    if (budget === "Under $45K") model = "BMW X1";
    else if (budget === "$45K – $70K") model = "BMW X3 M40i";
    else model = "BMW X5";
  } else if (vehicleType === "Sedan") {
    if (budget === "Under $45K") model = "BMW 3 Series";
    else if (budget === "$45K – $70K") model = "BMW 5 Series";
    else model = "BMW 7 Series";
  } else {
    model = "BMW i4 — an electric Gran Coupe blending luxury and innovation.";
  }

  const responseText = `Based on your preferences, we recommend the ${model}.`;

  res.json({
    fulfillmentMessages: [
      { text: { text: [responseText] } }
    ]
  });
});

app.listen(3000, () => {
  console.log('BMW Webhook is running on port 3000');
});
