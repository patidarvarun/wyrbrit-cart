import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CommonHeader } from "../components/commonHeader";
import Accordion from "@mui/material/Accordion";
import country from "../data/wooCommerce/countries";
import MenuItem from "@mui/material/MenuItem";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import wooCredential from "../data/wooCommerce/wooCredentialKey";
import Loader from "../components/common/loader";
import Select from "@mui/material/Select";

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

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const wooapi = wooCredential();
  const { billing, onChange, ...other } = props;
  let getData = localStorage.getItem("data");
  let product = JSON.parse(getData);
  const [clientSecret, setClientSecret] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [countryy, setCountryy] = useState("");
  const [state, setState] = useState("");
  const [stateData, setStateData] = useState("");
  const [stateDatas, setStateDatas] = useState("");
  const [loading, setLoading] = useState(false);

  let total = 0;
  let pric = 0;
  let productArray = [];
  for (let i = 0; i < product.length; i++) {
    pric = product[i].quantity * product[i].product.price;
    total = total + pric;
  }
  {
    product.map((data) => {
      productArray.push({
        product_id: data.product.id,
        quantity: data.quantity,
        total: `${data.quantity * data.product.price}`,
      });
    });
  }

  const createOrder = async () => {
    const handleData = {
      payment_method: "",
      payment_method_title: "",
      set_paid: true,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address1,
        address_2: address2,
        city: city,
        state: stateDatas === "" ? state : stateDatas,
        postcode: zipCode,
        country: countryy,
        email: email,
        phone: phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address1,
        address_2: address2,
        city: city,
        state: stateDatas === "" ? state : stateDatas,
        postcode: zipCode,
        country: countryy,
      },
      line_items: productArray,
    };

    try {
      const response = await wooapi.post("orders", handleData).then((data) => {
        localStorage.setItem("orderId", data.data.id);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error.response);
    }
  };

  function handleClick() {
    email === ""
      ? console.log("Required all field*")
      : fetch("/api/checkout-api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            FirstName: firstName,
            LastName: lastName,
            phone: phone,
            city: city,
            country: countryy,
            line1: address1,
            line2: address2,
            postal_code: zipCode,
            state: stateDatas === "" ? state : stateDatas,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setLoading(true);
            setClientSecret(json.client_secret);
            createOrder();
          });
  }

  function countr() {
    const countries = country();
    countries.then((data) => setCountry(data.data));
  }

  function handleState(e) {
    setStateDatas(e.target.value);
  }
  useEffect(() => {
    countr();
  }, []);

  const handleCountry = (e) => {
    setCountryy(e.target.value);
    Country.filter((item) =>
      item.code === e.target.value ? setStateData(item.states) : ""
    );
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
            city: city,
            country: countryy,
            line1: address1,
            line2: address2,
            postal_code: zipCode,
            state: stateDatas === "" ? state : stateDatas,
          },
          email: email,
          name: `${firstName + " " + lastName}`,
        },
      },
    });

    if (result.error) {
      console.log("error", result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        window.location.replace(
          `http://localhost:3000/success?key=${result.paymentIntent.id}`
        );
      }
    }
  };

  return (
    <div {...other} style={{ marginLeft: "10px" }}>
      <CommonHeader />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h3" sx={{ mt: 3 }}>
        Checkout
      </Typography>
      <br />
      <br />
      <br />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography sx={{ ml: 2 }} variant="h6">
          Billing Address
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item sm={3} xs={12}>
            <TextField
              fullWidth
              label="First Name *"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item sm={3} xs={12}>
            <TextField
              fullWidth
              label="Last Name *"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <InputLabel id="demo-select-small">Country *</InputLabel>
            <FormControl fullWidth className="filter ml-0 w-100 country">
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={countryy}
                label="country *"
                onChange={handleCountry}
              >
                {Country &&
                  Country.map((item) => {
                    return (
                      <MenuItem key={item.name} value={item.code}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Street Line 1 *"
              name="address1"
              onChange={(e) => setAddress1(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Street Line 2 (optional)"
              name="address2"
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Town / City *"
              name="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <InputLabel id="demo-select-small">State</InputLabel>
            {stateData && stateData.length === 0 ? (
              <TextField
                fullWidth
                label=""
                margin="normal"
                name="state"
                onChange={(e) => setState(e.target.value)}
              />
            ) : (
              <FormControl fullWidth className="filter ml-0 w-100 country">
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={stateDatas}
                  label="country"
                  onChange={handleState}
                >
                  {stateData &&
                    stateData.map((item) => {
                      return (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="ZIP Code *"
              name="zipCode"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Phone *"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "3px" }}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Email address *"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 6,
        }}
      >
        <Typography sx={{ ml: 2 }} variant="h6">
          Your order
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: "3px" }}>
        <Grid item sm={6} xs={12}>
          <Box
            sx={{
              color: "text.primary",
              mt: 3,
            }}
          >
            <table
              style={{ width: "100%" }}
              className="shop_table woocommerce-checkout-review-order-table"
            >
              <thead>
                <tr>
                  <th className="product-name">Product</th>
                  <th className="product-total">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.map((item) => {
                    return (
                      <tr className="cart_item">
                        <td className="product-name">
                          {item.product.name} ×&nbsp;{" "}
                          <strong className="product-quantity">
                            {" "}
                            &nbsp;{item.quantity}
                          </strong>{" "}
                        </td>
                        <td className="product-total">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              {item.quantity * item.product.price}
                            </bdi>
                          </span>{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr className="cart-subtotal">
                  <th>Subtotal</th>
                  <td>
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        <span className="woocommerce-Price-currencySymbol">
                          $
                        </span>
                        {total}
                      </bdi>
                    </span>
                  </td>
                </tr>

                <tr className="order-total">
                  <th>Total</th>
                  <td>
                    <strong>
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {total}
                        </bdi>
                      </span>
                    </strong>{" "}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: "3px" }}>
        <Grid item sm={6} xs={12}>
          <Box
            sx={{
              color: "text.primary",
              mt: 3,
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "500" }}>
                  {" "}
                  Cash on delivery
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Pay with cash upon delivery.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                onClick={() => handleClick()}
              >
                <Typography style={{ fontWeight: "700", fontSize: "20px" }}>
                  {" "}
                  Credit Card (Stripe)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form onSubmit={handleSubmit}>
                  {!loading ? (
                    <>
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
                      {email === "" ? (
                        <Button
                          type="submit"
                          size="large"
                          sx={{ mr: 3 }}
                          disabled
                          className="orderr "
                        >
                          Place order
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          size="large"
                          sx={{ mr: 3 }}
                          disabled={!stripe}
                          className="orderr "
                        >
                          Place order
                        </Button>
                      )}
                    </>
                  ) : (
                    <Loader />
                  )}
                </form>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Checkout;
