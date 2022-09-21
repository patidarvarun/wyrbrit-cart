const stripe = require("stripe")(
  "sk_test_51LabasSBAnAyyheh89V5X2XUcvdbHgZGuYzKTuW6Q2QsvAykAnnIHeymcTPmaWzlXJv5MtIdNyENRxqXkNQ8mHcr00a5Oqd4Gk"
);

module.exports = async (req, res) => {
  const { id } = req.body;
  let session;
  try {
    session = await stripe.checkout.sessions
      .retrieve(id)
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        console.log("errrr", err.message);
      });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }

  return session;
};
