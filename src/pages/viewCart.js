import React, { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { CommonHeader } from "../components/commonHeader";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Link from "next/link";

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
  let getData = localStorage.getItem("data");
  let product = JSON.parse(getData);
  const [quantity1, setQuantity1] = useState(1);

  let total = 0;
  let pric = 0;
  for (let i = 0; i < product.length; i++) {
    pric = product[i].quantity * product[i].product.price;
    total = total + pric;
  }
  let products = [];

  function handleCart(e, data, i) {
    setQuantity1(e.target.value);

    const getLocalData = localStorage.getItem("data");
    const alreadyProduct = JSON.parse(getLocalData);
    alreadyProduct.forEach((element, index) => {
      if (index === i) {
        products.push({ product: data.product, quantity: e.target.value });
      } else {
        products.push({ product: element.product, quantity: element.quantity });
      }
    });
    localStorage.setItem("data", JSON.stringify(products));
  }
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
                  <h1>Cart</h1>
                  <table>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">SubTotal</th>
                    </tr>
                    {product &&
                      product.map((item, index) => {
                        return (
                          <tr key={item.product.id}>
                            <th scope="row1">{item.product.name}</th>
                            <td>{item.product.price}</td>
                            <td>
                              <input
                                type="number"
                                style={{
                                  width: "50px",
                                  height: "46px",
                                  textAlign: "center",
                                  marginRight: "10px",
                                }}
                                defaultValue={item.quantity}
                                onClick={(e) => handleCart(e, item, index)}
                              />
                            </td>
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
              <h4>Total &emsp;&emsp;&emsp;&emsp;&emsp; &emsp; &nbsp;{total}</h4>
            </Box>
            <Link href="/checkout">
              <Button size="large" sx={{ mr: 3 }} className="cart">
                Proceed to checkout
              </Button>
            </Link>
          </>
        )}
      </Paper>
    </>
  );
}
export default ViewCart;
