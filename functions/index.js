/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  logger.info("GET / endpoint hit");
  res.status(200).json({
    message: "success!",
  });
});

exports.api = onRequest(app);

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // The amount is in the smallest currency unit (e.g., cents for USD)
        currency: "usd",
      });

      // Return the created payment intent
      res.status(202).json({ clientsecret: paymentIntent.client_secret });
    } catch (error) {
      // Log the error and send a 500 response
      logger.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Payment creation failed", error });
    }
  } else {
    res.status(403).json({ message: "Total must not be 0" });
  }
});
