const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
  const contexts = req.body.queryResult.outputContexts || [];

  const getParam = (ctxName, key) => {
    const ctx = contexts.find(c => c.name.includes(ctxName));
    return ctx?.parameters?.[key];
  };

  const vehicleType = getParam('vehicle-followup', 'vehicleType');
  const budget = getParam('budget-followup', 'budget');

  let model = '';
  let link = '';
  let subtitle = '';

  // Recommendation Logic
  if (vehicleType === 'SUV') {
    if (budget === 'Under $45K') {
      model = 'BMW X1';
      link = 'https://www.bmwusa.com/vehicles/x-models/x1/sports-activity-vehicle/overview.html';
      subtitle = 'Compact and efficient. Starting under $45K.';
    } else if (budget === '$45K–$70K') {
      model = 'BMW X3 M40i';
      link = 'https://www.bmwusa.com/vehicles/x-models/x3/sports-activity-vehicle/overview.html';
      subtitle = 'Performance and luxury in a midsize SUV. ~$61K.';
    } else {
      model = 'BMW X5';
      link = 'https://www.bmwusa.com/vehicles/x-models/x5/sports-activity-vehicle/overview.html';
      subtitle = 'Spacious and premium. Starts over $70K.';
    }
  } else if (vehicleType === 'Sedan') {
    if (budget === 'Under $45K') {
      model = 'BMW 2 Series Gran Coupe';
      link = 'https://www.bmwusa.com/vehicles/2-series/gran-coupe/overview.html';
      subtitle = 'Sporty compact four-door. Under $45K.';
    } else if (budget === '$45K–$70K') {
      model = 'BMW 5 Series';
      link = 'https://www.bmwusa.com/vehicles/5-series/sedan/overview.html';
      subtitle = 'Executive comfort and tech. ~$57K.';
    } else {
      model = 'BMW 7 Series';
      link = 'https://www.bmwusa.com/vehicles/7-series/sedan/overview.html';
      subtitle = 'Flagship luxury sedan. Starts above $90K.';
    }
  } else if (vehicleType === 'Coupe') {
    if (budget === 'Under $45K') {
      model = 'BMW 2 Series Coupe';
      link = 'https://www.bmwusa.com/vehicles/2-series/coupe/overview.html';
      subtitle = 'Sporty and agile coupe. Under $45K.';
    } else if (budget === '$45K–$70K') {
      model = 'BMW 4 Series Coupe';
      link = 'https://www.bmwusa.com/vehicles/4-series/coupe/overview.html';
      subtitle = 'Modern luxury coupe. ~$55K.';
    } else {
      model = 'BMW 8 Series Coupe';
      link = 'https://www.bmwusa.com/vehicles/8-series/coupe/overview.html';
      subtitle = 'Grand touring luxury. Starts ~$88K.';
    }
  } else {
    model = 'BMW i4';
    link = 'https://www.bmwusa.com/vehicles/all-electric/i4.html';
    subtitle = 'Electric luxury Gran Coupe.';
  }

  const responseText = `Based on your preferences, we recommend the ${model}.`;

  res.json({
    fulfillmentMessages: [
      { text: { text: [responseText] } },
      {
        payload: {
          richContent: [
            // Box 1: Recommendation Info
            [
              {
                type: 'info',
                title: model,
                subtitle: subtitle,
                actionLink: link
              }
            ],
            // Box 2: Book a Test Drive
            [
              {
                type: 'chips',
                options: [
                  {
                    text: 'Book a Test Drive',
                    link: 'https://www.bmwusa.com/tools/test-drive.html'
                  }
                ]
              }
            ],
            // Box 3: Other Actions
            [
              {
                type: 'chips',
                options: [
                  {
                    text: 'Find a Dealer',
                    link: 'https://www.bmwusa.com/dealer.html'
                  },
                  {
                    text: 'Explore More Models',
                    link: 'https://www.bmwusa.com/vehicles.html'
                  }
                ]
              }
            ]
          ]
        }
      }
    ]
  });
});

app.listen(3000, () => {
  console.log('BMW SelectAssist webhook running on port 3000');
});
