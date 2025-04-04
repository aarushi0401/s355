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

  const actionLinkMap = {
    "BMW X1": "https://www.bmwusa.com/vehicles/x-models/x1/sports-activity-vehicle/overview.html",
    "BMW X3 M40i": "https://www.bmwusa.com/vehicles/x-models/x3/sports-activity-vehicle/overview.html",
    "BMW X5": "https://www.bmwusa.com/vehicles/x-models/x5/sports-activity-vehicle/overview.html",
    "BMW 3 Series": "https://www.bmwusa.com/vehicles/3-series/sedan/overview.html",
    "BMW 5 Series": "https://www.bmwusa.com/vehicles/5-series/sedan/overview.html",
    "BMW 7 Series": "https://www.bmwusa.com/vehicles/7-series/sedan/overview.html",
    "BMW i4 — an electric Gran Coupe blending luxury and innovation.": "https://www.bmwusa.com/vehicles/all-electric/i4/sedan/overview.html"
  };

  const responseText = `Based on your preferences, we recommend the ${model}.`;

  res.json({
    fulfillmentMessages: [
      {
        text: {
          text: [responseText]
        }
      },
      {
        payload: {
          richContent: [
            [
              {
                type: "info",
                title: model,
                subtitle: "Learn more about this model",
                actionLink: actionLinkMap[model] || "https://www.bmwusa.com"
              },
              {
                type: "info",
                title: "Find a Dealer",
                subtitle: "Schedule a test drive nearby",
                actionLink: "https://www.bmwusa.com/dealer.html"
              },
              {
                type: "info",
                title: "Explore More Models",
                subtitle: "Browse other BMW options",
                actionLink: "https://www.bmwusa.com/vehicles.html"
              }
            ]
          ]
        }
      }
    ]
  });
});

app.listen(3000, () => {
  console.log('BMW Webhook is running on port 3000');
});
