import React, { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { CommonHeader } from "../components/commonHeader";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ViewCart() {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  let getData = localStorage.getItem("data");
  let product = JSON.parse(getData);
  const [clientSecret, setClientSecret] = useState("");

  let total = 0;
  let pric = 0;
  console.log("product", product);
  for (let i = 0; i < product.length; i++) {
    pric = product[i].quantity * product[i].product.price;
    total = total + pric;
  }
  const handleClick = () => {
    fetch("/api/checkout-api/")
      .then((res) => res.json())
      .then((json) => {
        setClientSecret(json.client_secret);
      });
    console.log("OK");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(`${clientSecret}`, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: "San Francisco",
            country: "US",
            line1: "510 Townsend St",
            line2: "510 Townsend St",
            postal_code: "98140",
            state: "WA",
          },
          email: "var@gmail.com",
          name: "Jenny Rosen",
        },
      },
    });

    if (result.error) {
      console.log("errrrrrrrrrrrrr", result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("##############", result);
      }
    }
  };
  console.log("clientSecret", clientSecret);
  return (
    <>
      <CommonHeader />
      <br />
      <br />
      <br />
      <br />

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          width: "100%",
          maxWidth: 1000,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        {product === null ? (
          <h1>There is no items in cart!!</h1>
        ) : (
          <>
            <Grid container spacing={12}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <table>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">SubTotal</th>
                    </tr>
                    {product &&
                      product.map((item) => {
                        return (
                          <tr key={item.product.id}>
                            <th scope="row1">{item.product.name}</th>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity}</td>
                          </tr>
                        );
                      })}
                  </table>
                </Grid>
              </Grid>
            </Grid>
            <h1>Cart totals</h1>
            <Box
              sx={{
                width: 500,
                height: 100,
                backgroundColor: "#e1e1e1",
              }}
            >
              <h4>Subtotal &emsp;&emsp;&emsp;&emsp;&emsp;{total}</h4>
              <h4>Total &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &nbsp;{total}</h4>
            </Box>
            {/* <Link href="/checkout"> */}
            <Button
              size="large"
              sx={{ mr: 3 }}
              className="cart"
              onClick={handleClick}
            >
              Proceed to checkout
            </Button>
            {/* </Link> */}
          </>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Card details
            <CardElement
              options={options}
              onReady={() => {
                console.log("CardElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardElement [blur]");
              }}
              onFocus={() => {
                console.log("CardElement [focus]");
              }}
            />
          </label>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </Paper>
    </>
  );
}
export default ViewCart;
