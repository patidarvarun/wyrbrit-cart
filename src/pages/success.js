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
import Link from "next/link";
import { useRouter } from "next/router";
import { CommonHeader } from "../components/commonHeader";

const Success = () => {
  const router = useRouter();
  const id = router.query.key;
  const [paymentData, setPaymentData] = useState("");
  let getData = localStorage.getItem("data");
  let product = JSON.parse(getData);

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
      .then((json) => {
        setPaymentData(json);
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
            <CardHeader title="Order received" />
            <Typography
              color="textSecondary"
              variant="subtitle2"
              style={{ marginLeft: "25px", marginTop: "-16px" }}
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
                        style={{ fontSize: "11px", fontWeight: "500" }}
                      >
                        ORDER NUMBER:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700" }}
                      >
                        10327
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
                        style={{ fontSize: "11px", fontWeight: "500" }}
                      >
                        DATE:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700" }}
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
                        style={{ fontSize: "11px", fontWeight: "500" }}
                      >
                        TOTAL:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700" }}
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
                        style={{ fontSize: "11px", fontWeight: "500" }}
                      >
                        PAYMENT METHOD:
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "700" }}
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
                  fontSize: "1.9em",
                  marginLeft: "24px",
                  fontWeight: "600",
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
