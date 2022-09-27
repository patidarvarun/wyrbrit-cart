import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { CommonHeader } from "../components/commonHeader";
import wooCredential from "../data/wooCommerce/wooCredentialKey";

const Success = () => {
  const router = useRouter();
  const wooapi = wooCredential();
  const id = router.query.key;
  const [paymentData, setPaymentData] = useState("");
  let getData = localStorage.getItem("data");
  let orderid = localStorage.getItem("orderId");
  let product = JSON.parse(getData);
  const [orderData, setOrderData] = useState("");
  let datee = orderData?.data?.date_completed;
  var today = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let total = 0;
  let pric = 0;
  for (let i = 0; i < product.length; i++) {
    pric = product[i].quantity * product[i].product.price;
    total = total + pric;
  }
  function handleClear() {
    localStorage.clear("data");
    window.location.replace("/shop");
  }
  function getPaymentIntent() {
    fetch("/api/userData/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        setPaymentData(json);
        const handleUpdate = {
          status: "completed",
          transaction_id: json.payment_method,
        };
        try {
          await wooapi.post(`orders/${orderid}`, handleUpdate).then((data) => {
            setOrderData(data);
          });
        } catch (error) {
          console.log("error", error.res);
        }
      });
  }

  useEffect(() => {
    getPaymentIntent();
  }, [id]);
  return (
    <div>
      <CommonHeader />
      <br />
      <br />
      <br />
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          p: 3,
        }}
      >
        <Card>
          <CardContent>
            <p style={{ fontWeight: "600", fontSize: "17px" }}>
              Order received
            </p>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              style={{
                marginLeft: "2px",
                marginTop: "-8px",
                fontSize: "17px",
              }}
            >
              Thank you. Your order has been received.
            </Typography>
            <List>
              <div style={{ marginLeft: "45px", display: "flex" }}>
                <ListItem disableGutters>
                  <ListItemText
                    className="bordercss"
                    disableTypography
                    primary={
                      <Typography
                        variant="caption"
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#4a4646",
                        }}
                      >
                        ORDER NUMBER:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        {orderid}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    className="bordercss"
                    disableTypography
                    primary={
                      <Typography
                        variant="caption"
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#4a4646",
                        }}
                      >
                        DATE:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        {today}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    className="bordercss"
                    disableTypography
                    primary={
                      <Typography
                        variant="caption"
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#4a4646",
                        }}
                      >
                        EMAIL:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        {paymentData?.charges?.data[0]?.billing_details?.email}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    className="bordercss"
                    disableTypography
                    primary={
                      <Typography
                        variant="caption"
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#4a4646",
                        }}
                      >
                        TOTAL:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        ${paymentData?.amount / 100}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    className="bordercsss"
                    disableTypography
                    primary={
                      <Typography
                        variant="caption"
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#4a4646",
                        }}
                      >
                        PAYMENT METHOD:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        {paymentData?.charges?.data[0].payment_method_details?.card.funding
                          .charAt(0)
                          .toUpperCase() +
                          paymentData?.charges?.data[0].payment_method_details?.card.funding.slice(
                            1
                          ) +
                          " " +
                          paymentData?.charges?.data[0]?.payment_method_details?.type
                            .charAt(0)
                            .toUpperCase() +
                          paymentData?.charges?.data[0]?.payment_method_details?.type.slice(
                            1
                          ) +
                          " " +
                          "(" +
                          paymentData?.charges?.data[0]
                            ?.calculated_statement_descriptor +
                          ")"}
                      </Typography>
                    }
                  />
                </ListItem>
              </div>
              <p
                style={{
                  fontSize: "2em",
                  fontWeight: "600",
                  marginBottom: "-42px",
                  marginTop: "42px",
                }}
              >
                Order details
              </p>
              <Grid container spacing={3} sx={{ marginTop: "3px" }}>
                <Grid item sm={12} xs={12}>
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
                          <th className="product-name fontSizee">Product</th>
                          <th className="product-total fontSizee">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product &&
                          product.map((item) => {
                            return (
                              <tr className="cart_item">
                                <td className="product-name fontSizee">
                                  {item.product.name} ×&nbsp;{" "}
                                  <strong className="product-quantity">
                                    {" "}
                                    &nbsp;{item.quantity}
                                  </strong>{" "}
                                </td>
                                <td className="product-total fontSizee">
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
                          <th className="fontSizee">Subtotal:</th>
                          <td className="fontSizee">
                            <strong>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">
                                    $
                                  </span>
                                  {total}
                                </bdi>
                              </span>
                            </strong>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th className="fontSizee">Payment method:</th>
                          <td className="fontSizee">
                            <strong>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">
                                    {paymentData?.charges?.data[0].payment_method_details?.card.funding
                                      .charAt(0)
                                      .toUpperCase() +
                                      paymentData?.charges?.data[0].payment_method_details?.card.funding.slice(
                                        1
                                      ) +
                                      " " +
                                      paymentData?.charges?.data[0]?.payment_method_details?.type
                                        .charAt(0)
                                        .toUpperCase() +
                                      paymentData?.charges?.data[0]?.payment_method_details?.type.slice(
                                        1
                                      ) +
                                      " " +
                                      "(" +
                                      paymentData?.charges?.data[0]
                                        ?.calculated_statement_descriptor +
                                      ")"}
                                  </span>
                                </bdi>
                              </span>
                            </strong>
                          </td>
                        </tr>

                        <tr className="order-total">
                          <th className="fontSizee">Total:</th>
                          <td className="fontSizee">
                            <strong>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">
                                    $
                                  </span>
                                  {paymentData?.amount / 100}
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
              <p
                style={{
                  fontSize: "2em",
                  fontWeight: "600",
                  marginBottom: "-42px",
                  marginTop: "42px",
                }}
              >
                Billing address
              </p>
              <Grid container spacing={3} sx={{ marginTop: "3px" }}>
                <Grid item sm={12} xs={12}>
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
                      <p className="billing">
                        {paymentData?.charges?.data[0]?.billing_details?.name}
                      </p>
                      <p className="billing">
                        {
                          paymentData?.charges?.data[0]?.billing_details
                            ?.address?.line1
                        }
                      </p>
                      <p className="billing">
                        {
                          paymentData?.charges?.data[0]?.billing_details
                            ?.address?.line2
                        }
                      </p>

                      <p className="billing">
                        {
                          paymentData?.charges?.data[0]?.billing_details
                            ?.address?.city
                        }
                        , &nbsp;
                        {
                          paymentData?.charges?.data[0]?.billing_details
                            ?.address?.state
                        }{" "}
                        &nbsp;
                        {
                          paymentData?.charges?.data[0]?.billing_details
                            ?.address?.postal_code
                        }
                      </p>
                      <p className="billing1">
                        {paymentData?.charges?.data[0]?.billing_details?.phone}
                      </p>
                      <p className="billing1">
                        {paymentData?.charges?.data[0]?.billing_details?.email}
                      </p>
                    </table>
                  </Box>
                </Grid>
              </Grid>
              <div style={{ display: "flex" }}>
                <p className="paymentcss2">Transaction_id :</p>
                <p className="paymentcss">
                  &nbsp;{paymentData?.payment_method}{" "}
                </p>
              </div>
              <ListItem disableGutters divider></ListItem>
            </List>
          </CardContent>

          <Button
            style={{ width: "10%", height: "3em" }}
            variant="contained"
            onClick={() => handleClear()}
            className="successhover"
          >
            <div>
              <p className="text">Back</p>
            </div>
          </Button>
        </Card>
      </Box>
    </div>
  );
};

export default Success;
