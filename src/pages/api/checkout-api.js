const stripe = require("stripe")(
  "sk_test_51LabasSBAnAyyheh89V5X2XUcvdbHgZGuYzKTuW6Q2QsvAykAnnIHeymcTPmaWzlXJv5MtIdNyENRxqXkNQ8mHcr00a5Oqd4Gk"
);

module.exports = async (req, res) => {
  let session;
  console.log("@@@@@@@@@@@@@@", req.body);
  try {
    session = await stripe.paymentIntents
      .create({
        currency: "usd",
        amount: req.body.amount,
        description: "Software development services",
        shipping: {
          name: req.body.FirstName,
          address: {
            city: req.body.city,
            country: req.body.country,
            line1: req.body.line1,
            line2: req.body.line2,
            postal_code: req.body.postal_code,
            state: res.body.state,
          },
        },
        payment_method_types: ["card"],
        // automatic_payment_methods: { enabled: true },
      })
      .then((data) => {
        console.log("datatata", data);
        res.send(data);
      });
    // res.json({ url: session.url });
    return session;
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
